chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) {
    return;
  }

  clearActionFeedback(tab.id);

  if (!isSupportedTab(tab.url)) {
    await showActionFeedback(tab.id, {
      state: "error",
      message: "Open a YouTube video before using tiny-yt.",
    });
    return;
  }

  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: togglePictureInPicture,
    });

    if (result) {
      await showActionFeedback(tab.id, result);
    }
  } catch (error) {
    await showActionFeedback(tab.id, {
      state: "error",
      message: getInjectionErrorMessage(tab.url, error),
    });
  }
});

async function showActionFeedback(tabId, { state, message }) {
  const badgeTextByState = {
    opened: "ON",
    closed: "OFF",
    error: "!",
  };
  const badgeColorByState = {
    opened: "#188038",
    closed: "#5f6368",
    error: "#d93025",
  };

  await chrome.action.setTitle({
    tabId,
    title: `tiny-yt: ${message}`,
  });

  await chrome.action.setBadgeBackgroundColor({
    tabId,
    color: badgeColorByState[state] || "#5f6368",
  });

  await chrome.action.setBadgeText({
    tabId,
    text: badgeTextByState[state] || "",
  });

  setTimeout(() => {
    clearActionFeedback(tabId);
  }, 3000);
}

function clearActionFeedback(tabId) {
  chrome.action.setBadgeText({
    tabId,
    text: "",
  });

  chrome.action.setTitle({
    tabId,
    title: "Open the current YouTube video in Picture-in-Picture",
  });
}

function getInjectionErrorMessage(tabUrl, error) {
  if (!tabUrl || !isSupportedTab(tabUrl)) {
    return "Open a YouTube tab before using tiny-yt.";
  }

  const message = error?.message || String(error);

  if (message.includes("Cannot access contents of")) {
    return "This page cannot be controlled. Open a YouTube video instead.";
  }

  return "Could not toggle Picture-in-Picture on this page.";
}

function isSupportedTab(tabUrl) {
  if (!tabUrl || tabUrl.startsWith("chrome://") || tabUrl.startsWith("edge://")) {
    return false;
  }

  try {
    const { hostname } = new URL(tabUrl);

    return hostname === "youtube.com" || hostname.endsWith(".youtube.com");
  } catch {
    return false;
  }
}

async function togglePictureInPicture() {
  if (!document.pictureInPictureEnabled) {
    return {
      state: "error",
      message: "Picture-in-Picture is not available on this page.",
    };
  }

  if (document.pictureInPictureElement) {
    await document.exitPictureInPicture();

    return {
      state: "closed",
      message: "Picture-in-Picture closed.",
    };
  }

  const video = getBestVideoCandidate();

  if (!video) {
    return {
      state: "error",
      message: "No playable video was found on this page.",
    };
  }

  try {
    await video.requestPictureInPicture();

    return {
      state: "opened",
      message: "Picture-in-Picture opened.",
    };
  } catch (error) {
    return {
      state: "error",
      message: error?.message || "Could not open Picture-in-Picture.",
    };
  }

  function getBestVideoCandidate() {
    const candidates = Array.from(document.querySelectorAll("video"))
      .filter((videoElement) => {
        if (videoElement.disablePictureInPicture) {
          return false;
        }

        const rect = videoElement.getBoundingClientRect();

        return rect.width > 0 && rect.height > 0;
      })
      .sort((left, right) => {
        const leftRect = left.getBoundingClientRect();
        const rightRect = right.getBoundingClientRect();

        return rightRect.width * rightRect.height - leftRect.width * leftRect.height;
      });

    return candidates[0] || null;
  }
}
