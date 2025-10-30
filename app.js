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

        // Helper function to trigger URL generation by interacting with attachment
        const triggerAttachmentUrlGeneration = async (attachmentCardView, index) => {
          try {
            const element = attachmentCardView.getElement();
            if (!element) return;

            console.log(`[Attachment ${index}] Triggering URL generation via hover/focus...`);

            // Simulate mouse hover to trigger lazy loading
            const mouseenterEvent = new MouseEvent('mouseenter', {
              view: window,
              bubbles: true,
              cancelable: true
            });
            element.dispatchEvent(mouseenterEvent);

            // Try to focus the element
            const focusableElement = element.querySelector('a, button, [tabindex]');
            if (focusableElement) {
              focusableElement.focus();
            }

            // Wait a bit for Gmail to generate URLs
            await new Promise(resolve => setTimeout(resolve, 200));
          } catch (error) {
            console.warn(`[Attachment ${index}] Failed to trigger URL generation:`, error.message);
          }
        };

        // Helper function to retry getting download URL with delay
        const getDownloadURLWithRetry = async (attachmentCardView, index, maxRetries = 1) => {
          // First, try to trigger URL generation
          await triggerAttachmentUrlGeneration(attachmentCardView, index);

          for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
              console.log(`[Attachment ${index}] Attempt ${attempt}/${maxRetries} to get download URL from InboxSDK...`);

              const url = await attachmentCardView.getDownloadURL();

              if (url && typeof url === 'string' && url.length > 0) {
                // Verify it's not a thumbnail URL
                if (url.includes('=s') || url.includes('sz=')) {
                  console.warn(`[Attachment ${index}] InboxSDK returned thumbnail URL, switching to DOM extraction...`);
                  break; // Don't retry, go to DOM extraction
                }
                console.log(`[Attachment ${index}] ✓ Successfully got download URL from InboxSDK`);
                return url;
              }

              console.warn(`[Attachment ${index}] InboxSDK getDownloadURL returned empty/null`);
            } catch (error) {
              console.warn(`[Attachment ${index}] InboxSDK getDownloadURL failed:`, error.message);
            }

            if (attempt < maxRetries) {
              await new Promise(resolve => setTimeout(resolve, 300));
            }
          }

          console.log(`[Attachment ${index}] InboxSDK method failed, will use DOM extraction fallback`);
          return null;
        };

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
              // Try multiple methods to extract file size from DOM
              const sizeSelectors = [
                '.aZo span',           // Common Gmail attachment size container
                '.aQw span',           // Alternative Gmail attachment size
                '[role="link"] span',  // Link spans that might contain size
                '.aQw',                // Direct size container
                '.aZo',                // Alternative direct container
                'span[title]',         // Spans with title attributes
                'div[aria-label] span' // Divs with aria labels
              ];

              for (const selector of sizeSelectors) {
                const sizeElements = element.querySelectorAll(selector);
                for (const sizeElement of sizeElements) {
                  if (sizeElement && sizeElement.textContent) {
                    const text = sizeElement.textContent.trim();
                    // Match patterns like "(1.5 MB)", "1.5 MB", "1.5MB", "1.5 KB", etc.
                    const sizeMatch = text.match(/\(?(\d+\.?\d*\s*[KMGT]?B)\)?/i);
                    if (sizeMatch) {
                      metadata.size = sizeMatch[1].trim();
                      console.log(`[Attachment ${index}] Found size: ${metadata.size} in element with selector: ${selector}`);
                      break;
                    }
                  }
                }
                if (metadata.size) break;
              }

              // If no size found, log for debugging
              if (!metadata.size) {
                console.warn(`[Attachment ${index}] Could not extract file size from DOM`);
                // Log all text content for debugging
                const allText = element.textContent.substring(0, 200);
                console.log(`[Attachment ${index}] Element text preview: "${allText}"`);
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
          if (!element) {
            console.error(`[Attachment ${index}] ✗ No element provided for DOM extraction`);
            return null;
          }

          console.log(`[Attachment ${index}] Searching for download URL in DOM...`);

          // Find all links and images in the attachment card and parent elements
          const allLinks = element.querySelectorAll('a');
          const allImages = element.querySelectorAll('img');

          console.log(`[Attachment ${index}] Found ${allLinks.length} links and ${allImages.length} images`);

          // Log all links for debugging
          allLinks.forEach((link, i) => {
            const href = link.href || '';
            const download = link.getAttribute('download') || '';
            const hasGoogleusercontent = href.includes('googleusercontent.com');
            const hasMailDomain = href.includes('/mail/');
            console.log(`[Attachment ${index}] Link ${i}: ${hasGoogleusercontent ? 'googleusercontent' : hasMailDomain ? 'gmail' : 'other'} | download="${download}" | href="${href.substring(0, 120)}"`);
          });

          // Priority 1: Download link with explicit download attribute
          const downloadLink = element.querySelector('a[download][href*="googleusercontent.com"]');
          if (downloadLink?.href) {
            console.log(`[Attachment ${index}] ✓ Method 1: Found download link with download attribute`);
            return downloadLink.href;
          }

          // Priority 2: Direct mail-attachment URL
          const attachmentLink = element.querySelector('a[href*="mail-attachment.googleusercontent.com"]');
          if (attachmentLink?.href) {
            console.log(`[Attachment ${index}] ✓ Method 2: Found mail-attachment link`);
            return attachmentLink.href;
          }

          // Priority 3: Look for redirect URLs that Gmail uses (common pattern)
          const redirectLink = element.querySelector('a[href*="/mail/"][href*="view=att"]');
          if (redirectLink?.href) {
            console.log(`[Attachment ${index}] ✓ Method 3: Found Gmail attachment view link`);
            return redirectLink.href;
          }

          // Priority 4: Look for attachment ID in Gmail URL structure
          const gmailAttLink = element.querySelector('a[href*="attid="]');
          if (gmailAttLink?.href) {
            console.log(`[Attachment ${index}] ✓ Method 4: Found Gmail link with attid parameter`);
            return gmailAttLink.href;
          }

          // Priority 5: Look for any link that contains "disp=attd" (disposition: attachment)
          const dispAttLink = element.querySelector('a[href*="disp=attd"]');
          if (dispAttLink?.href) {
            console.log(`[Attachment ${index}] ✓ Method 5: Found link with disp=attd`);
            return dispAttLink.href;
          }

          // Priority 6: Look for ANY googleusercontent link that's not a thumbnail
          for (const link of allLinks) {
            if (link.href && link.href.includes('googleusercontent.com')) {
              const isThumbnail = link.href.includes('=s') || link.href.includes('sz=') ||
                                  link.href.includes('=w') || link.href.includes('=h');
              if (!isThumbnail) {
                console.log(`[Attachment ${index}] ✓ Method 6: Found googleusercontent link without thumbnail params`);
                return link.href;
              }
            }
          }

          // Priority 7: Look for ANY Gmail mail link
          const gmailLink = element.querySelector('a[href*="/mail/"]');
          if (gmailLink?.href) {
            const href = gmailLink.href;
            if (href.includes('view=') || href.includes('attid=') || href.includes('attach')) {
              console.log(`[Attachment ${index}] ✓ Method 7: Found Gmail link: ${href.substring(0, 100)}`);
              return href;
            }
          }

          // Priority 8: Try to find ANY googleusercontent link and clean it
          const anyGoogleLink = element.querySelector('a[href*="googleusercontent.com"]');
          if (anyGoogleLink?.href) {
            const cleanedUrl = removeUrlImageParameters(anyGoogleLink.href);
            console.log(`[Attachment ${index}] ✓ Method 8: Found googleusercontent link, cleaning parameters`);
            console.log(`[Attachment ${index}]   Original: ${anyGoogleLink.href.substring(0, 100)}`);
            console.log(`[Attachment ${index}]   Cleaned:  ${cleanedUrl.substring(0, 100)}`);
            return cleanedUrl;
          }

          // Priority 9: Check image sources and clean them (last resort)
          for (const img of allImages) {
            if (img.src && img.src.includes('googleusercontent.com')) {
              const cleanedUrl = removeUrlImageParameters(img.src);
              console.warn(`[Attachment ${index}] ⚠ Method 9 (FALLBACK): Using cleaned image src`);
              console.log(`[Attachment ${index}]   Image src: ${img.src.substring(0, 100)}`);
              console.log(`[Attachment ${index}]   Cleaned:   ${cleanedUrl.substring(0, 100)}`);
              return cleanedUrl;
            }
          }

          console.error(`[Attachment ${index}] ✗ No download URL found in DOM after trying all 9 methods`);
          console.error(`[Attachment ${index}] Element classes: ${element.className}`);
          console.error(`[Attachment ${index}] Element HTML preview: ${element.outerHTML.substring(0, 300)}`);
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

            // Try to get download URL with retry logic
            let downloadUrl = await getDownloadURLWithRetry(attachmentCardView, index + 1);

            // If InboxSDK retry failed, use DOM fallback
            if (!downloadUrl) {
              console.warn(`[Attachment ${index + 1}] InboxSDK failed after retries, using DOM fallback...`);
              try {
                const element = attachmentCardView.getElement();
                if (element) {
                  downloadUrl = extractUrlFromDOM(element, index + 1);
                  if (downloadUrl) {
                    console.log(`[Attachment ${index + 1}] Successfully extracted URL from DOM`);
                  }
                }
              } catch (error) {
                console.error(`[Attachment ${index + 1}] DOM extraction failed:`, error);
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