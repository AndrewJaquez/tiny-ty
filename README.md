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