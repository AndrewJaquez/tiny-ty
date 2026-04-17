# tiny-yt

A Chrome extension that pops YouTube videos into a floating Picture-in-Picture window — stays on top of all other windows and can be resized to thumbnail size.

## Install

1. Go to `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked** and select this folder

## Use

Navigate to a YouTube video and click the **tiny-yt toolbar icon** to pop it into a PiP window. Click the icon again (or press X in the PiP window) to close it.

## Permissions

`tiny-yt` uses only:

- `activeTab` so it can run only after you click the toolbar button on the current tab
- `scripting` so it can call the page's Picture-in-Picture API

It does not use background network requests, analytics, remote code, or persistent host permissions.

## Release Notes

The extension is packaged as a Manifest V3 extension and now declares `minimum_chrome_version: "88"` because `chrome.scripting` is only available in Chrome 88+.

Before submitting to the Chrome Web Store:

1. Build the upload ZIP with `./package-release.sh`.
2. Upload at least one real screenshot of the extension in use.
3. Publish the `docs/` folder with GitHub Pages and use `/privacy/` as the privacy policy URL.
4. Fill in the privacy section using [PRIVACY.md](PRIVACY.md).
5. Use the listing copy in [STORE_LISTING.md](STORE_LISTING.md).
6. Use [store-assets/tiny-yt-promo-440x280.png](store-assets/tiny-yt-promo-440x280.png) as the small promo tile.
