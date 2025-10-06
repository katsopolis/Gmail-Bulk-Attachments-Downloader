(function initializeExtension() {
  const start = () => {
    if (typeof InboxSDK === 'undefined' || typeof InboxSDK.load !== 'function') {
      setTimeout(start, 200);
      return;
    }

    InboxSDK.load(2, 'sdk_mlazzje-dlgmail_43a7d41655', {
      appName: 'Gmail Attachments Downloader',
      globalErrorLogging: false,
      eventTracking: false
    })
      .then((sdk) => {
        if (!sdk) {
          throw new Error('InboxSDK could not be initialised');
        }

        const handleAttachmentsButtonClick = async (event) => {
          const views = event?.attachmentCardViews;
          if (!Array.isArray(views) || views.length === 0) {
            console.error('No attachments available for download.');
            return;
          }

          const tasks = views.map(async (attachmentCardView, index) => {
            if (!attachmentCardView) {
              throw new Error(`AttachmentCardView missing (index ${index}).`);
            }

            let originalFilename;
            try {
              originalFilename = await attachmentCardView.getTitle();
            } catch (error) {
              console.warn(`Could not read filename (index ${index}):`, error);
              originalFilename = `attachment_${index}_${Date.now()}.download`;
            }

            let downloadUrl = null;
            try {
              const directUrl = await attachmentCardView.getDownloadURL();
              if (typeof directUrl === 'string' && directUrl.length > 0) {
                downloadUrl = directUrl;
              }
            } catch (error) {
              console.warn(`getDownloadURL failed (index ${index}):`, error);
            }

            if (!downloadUrl) {
              try {
                const element = attachmentCardView.getElement();
                if (element) {
                  const downloadLink = element.querySelector('a[download][href*="googleusercontent.com"]');
                  const imageLink = element.querySelector('a:not([download])[href*="googleusercontent.com/attachment"]');
                  const imageSrc = element.querySelector('img[src*="googleusercontent.com"]');

                  if (downloadLink?.href) {
                    downloadUrl = downloadLink.href;
                  } else if (imageLink?.href) {
                    downloadUrl = imageLink.href;
                  } else if (imageSrc?.src) {
                    downloadUrl = removeUrlImageParameters(imageSrc.src);
                  }
                }
              } catch (error) {
                console.error(`Failed to read attachment URL from DOM (index ${index}):`, error);
              }
            }

            if (!downloadUrl) {
              throw new Error(`No download URL found (index ${index}).`);
            }

            return new Promise((resolve, reject) => {
              downloadAttachment(
                downloadUrl,
                originalFilename,
                () => resolve({ status: 'success', index }),
                (error) => reject(new Error(`Download failed (index ${index}): ${error.message}`))
              );
            });
          });

          const results = await Promise.allSettled(tasks);
          results
            .filter((result) => result.status === 'rejected')
            .forEach((result) => console.error(result.reason));
        };

        const addCustomAttachmentsToolbarButton = (messageView) => {
          try {
            messageView.addAttachmentsToolbarButton({
              tooltip: 'Download all',
              iconUrl: chrome.runtime.getURL('img/save.png'),
              onClick: handleAttachmentsButtonClick
            });
          } catch (error) {
            console.error('Failed to add attachments toolbar button:', error);
          }
        };

        const messageViewHandler = (messageView) => {
          try {
            if (messageView?.isLoaded()) {
              addCustomAttachmentsToolbarButton(messageView);
            }
          } catch (error) {
            console.error('Failed to process message view:', error);
          }
        };

        sdk.Conversations.registerMessageViewHandler(messageViewHandler);
      })
      .catch((error) => {
        console.error('InboxSDK initialization failed:', error);
        chrome.runtime.sendMessage({
          type: 'error',
          message: 'Extension failed to start: ' + error.message
        });
      });
  };
  start();
})();