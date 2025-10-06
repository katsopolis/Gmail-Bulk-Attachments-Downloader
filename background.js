chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'inboxsdk__injectPageWorld' && sender.tab) {
    if (!chrome.scripting) {
      sendResponse({ ok: false, error: 'scripting API unavailable' });
      return;
    }

    let documentIds;
    let frameIds;
    if (sender.documentId) {
      documentIds = [sender.documentId];
    } else if (typeof sender.frameId === 'number') {
      frameIds = [sender.frameId];
    }

    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id, documentIds, frameIds },
        world: 'MAIN',
        files: ['pageWorld.js']
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error('pageWorld injection failed:', chrome.runtime.lastError.message);
          sendResponse({ ok: false, error: chrome.runtime.lastError.message });
        } else {
          sendResponse({ ok: true });
        }
      }
    );

    return true;
  }

  if (message.type === 'downloadAttachment') {
    const { url, filename } = message.payload;
    console.log('Download request received:', url, filename);

    if (!url || !filename) {
      console.error('Invalid download request: missing URL or filename.');
      sendResponse({ status: 'error', message: 'URL or filename missing' });
      return;
    }

    chrome.downloads.download(
      {
        url,
        filename,
        saveAs: false,
        conflictAction: 'uniquify'
      },
      (downloadId) => {
        if (chrome.runtime.lastError || typeof downloadId === 'undefined') {
          console.error('Download failed:', chrome.runtime.lastError?.message);
          sendResponse({
            status: 'error',
            message: chrome.runtime.lastError?.message || 'Download could not be started'
          });
        } else {
          console.log(`'${filename}' download started, ID:`, downloadId);
          sendResponse({ status: 'success', downloadId });
        }
      }
    );

    return true;
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('Gmail Attachments Downloader active.');
});