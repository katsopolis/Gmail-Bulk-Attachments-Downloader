(function initializeExtension() {
  // Suppress InboxSDK non-critical errors
  const originalError = console.error;
  console.error = function(...args) {
    const message = args[0]?.toString() || '';

    // Filter out known InboxSDK internal errors that don't affect functionality
    const suppressedPatterns = [
      /pubsub\.googleapis\.com/i,
      /apparently already expired token/i,
      /assuming our clock is busted/i,
      /Failed to load.*googleapis\.com/i
    ];

    const shouldSuppress = suppressedPatterns.some(pattern => pattern.test(message));

    if (!shouldSuppress) {
      originalError.apply(console, args);
    }
  };

  const start = () => {
    if (typeof InboxSDK === 'undefined' || typeof InboxSDK.load !== 'function') {
      setTimeout(start, 200);
      return;
    }

    InboxSDK.load(2, 'sdk_mlazzje-dlgmail_43a7d41655', {
      appName: 'Gmail Attachments Downloader',
      globalErrorLogging: false,
      eventTracking: false,
      suppressAddonTitle: true,
      suppressThreadRowGapFix: true
    })
      .then((sdk) => {
        if (!sdk) {
          throw new Error('InboxSDK could not be initialised');
        }

        // Helper function to extract attachment metadata
        const extractAttachmentMetadata = async (attachmentCardView, index) => {
          const metadata = {
            filename: null,
            type: null,
            size: null,
            attachmentType: null
          };

          try {
            metadata.filename = await attachmentCardView.getTitle();
          } catch (error) {
            console.warn(`Could not read filename (index ${index}):`, error);
            metadata.filename = `attachment_${index}_${Date.now()}.download`;
          }

          try {
            metadata.attachmentType = attachmentCardView.getAttachmentType();
          } catch (error) {
            console.warn(`Could not read attachment type (index ${index}):`, error);
          }

          try {
            const element = attachmentCardView.getElement();
            if (element) {
              // Try to extract file size from DOM
              const sizeElement = element.querySelector('.aZo span, .aQw span, [role="link"] span');
              if (sizeElement && sizeElement.textContent) {
                const sizeMatch = sizeElement.textContent.match(/\(([^)]+)\)|\s+([\d.]+\s*[KMGT]B)/i);
                if (sizeMatch) {
                  metadata.size = sizeMatch[1] || sizeMatch[2];
                }
              }

              // Try to extract MIME type from DOM or filename
              const extension = metadata.filename?.split('.').pop()?.toLowerCase();
              if (extension) {
                metadata.type = inferMimeTypeFromExtension(extension);
              }
            }
          } catch (error) {
            console.warn(`Could not extract metadata from DOM (index ${index}):`, error);
          }

          return metadata;
        };

        // Helper function to infer MIME type from file extension
        const inferMimeTypeFromExtension = (extension) => {
          const mimeTypes = {
            'pdf': 'application/pdf',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xls': 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'ppt': 'application/vnd.ms-powerpoint',
            'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'bmp': 'image/bmp',
            'svg': 'image/svg+xml',
            'webp': 'image/webp',
            'txt': 'text/plain',
            'csv': 'text/csv',
            'html': 'text/html',
            'htm': 'text/html',
            'zip': 'application/zip',
            'rar': 'application/x-rar-compressed',
            '7z': 'application/x-7z-compressed',
            'tar': 'application/x-tar',
            'gz': 'application/gzip',
            'mp3': 'audio/mpeg',
            'mp4': 'video/mp4',
            'avi': 'video/x-msvideo',
            'mov': 'video/quicktime',
            'json': 'application/json',
            'xml': 'application/xml'
          };
          return mimeTypes[extension] || null;
        };

        // Helper function to extract URL from DOM with improved logic
        const extractUrlFromDOM = (element, index) => {
          // Priority 1: Download link with explicit download attribute
          const downloadLink = element.querySelector('a[download][href*="googleusercontent.com"]');
          if (downloadLink?.href) {
            return downloadLink.href;
          }

          // Priority 2: Attachment link (not image thumbnail)
          const attachmentLink = element.querySelector('a[href*="mail-attachment.googleusercontent.com"]');
          if (attachmentLink?.href) {
            return attachmentLink.href;
          }

          // Priority 3: General googleusercontent link without download attribute
          const imageLink = element.querySelector('a:not([download])[href*="googleusercontent.com/attachment"]');
          if (imageLink?.href && !imageLink.href.includes('/sz=')) {
            return imageLink.href;
          }

          // Priority 4: Image source (last resort, needs parameter cleaning)
          const imageSrc = element.querySelector('img[src*="googleusercontent.com"]');
          if (imageSrc?.src) {
            console.warn(`Attachment ${index}: Falling back to image src, may be thumbnail`);
            return removeUrlImageParameters(imageSrc.src);
          }

          return null;
        };

        // Helper function to validate download URL quality
        const validateDownloadUrl = (url) => {
          const result = {
            isProxy: false,
            isThumbnail: false,
            hasParameters: false
          };

          if (!url) return result;

          // Check for thumbnail/proxy indicators
          if (url.includes('=s') || url.includes('=w') || url.includes('=h')) {
            result.isThumbnail = true;
          }

          if (url.includes('/sz=') || url.includes('&sz=')) {
            result.isThumbnail = true;
          }

          if (url.includes('&disp=inline') || url.includes('?disp=inline')) {
            result.isProxy = true;
          }

          if (url.includes('?') || url.includes('&')) {
            result.hasParameters = true;
          }

          return result;
        };

        const handleAttachmentsButtonClick = async (event) => {
          const views = event?.attachmentCardViews;
          if (!Array.isArray(views) || views.length === 0) {
            console.error('No attachments available for download.');
            return;
          }

          console.log(`Starting download of ${views.length} attachment(s)...`);

          const tasks = views.map(async (attachmentCardView, index) => {
            if (!attachmentCardView) {
              throw new Error(`AttachmentCardView missing (index ${index}).`);
            }

            // Extract attachment metadata
            const metadata = await extractAttachmentMetadata(attachmentCardView, index);
            console.log(`Attachment ${index + 1}: "${metadata.filename}" (Type: ${metadata.type || 'unknown'}, Size: ${metadata.size || 'unknown'})`);

            let downloadUrl = null;
            try {
              const directUrl = await attachmentCardView.getDownloadURL();
              if (typeof directUrl === 'string' && directUrl.length > 0) {
                downloadUrl = directUrl;
                console.log(`Using InboxSDK URL for attachment ${index + 1}`);
              }
            } catch (error) {
              console.warn(`getDownloadURL failed (index ${index}):`, error);
            }

            if (!downloadUrl) {
              try {
                const element = attachmentCardView.getElement();
                if (element) {
                  downloadUrl = extractUrlFromDOM(element, index);
                  if (downloadUrl) {
                    console.log(`Using DOM fallback URL for attachment ${index + 1}`);
                  }
                }
              } catch (error) {
                console.error(`Failed to read attachment URL from DOM (index ${index}):`, error);
              }
            }

            if (!downloadUrl) {
              throw new Error(`No download URL found for "${metadata.filename}" (index ${index}).`);
            }

            // Validate URL quality
            const urlQuality = validateDownloadUrl(downloadUrl);
            if (urlQuality.isProxy || urlQuality.isThumbnail) {
              console.warn(`Attachment ${index + 1} URL may be a ${urlQuality.isProxy ? 'proxy' : 'thumbnail'}. File may differ from original.`);
            }

            return new Promise((resolve, reject) => {
              downloadAttachment(
                downloadUrl,
                metadata.filename,
                metadata,
                () => resolve({ status: 'success', index, filename: metadata.filename }),
                (error) => reject(new Error(`Download failed for "${metadata.filename}" (index ${index}): ${error.message}`))
              );
            });
          });

          const results = await Promise.allSettled(tasks);
          const succeeded = results.filter((r) => r.status === 'fulfilled').length;
          const failed = results.filter((r) => r.status === 'rejected').length;

          console.log(`Download complete: ${succeeded} succeeded, ${failed} failed`);

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