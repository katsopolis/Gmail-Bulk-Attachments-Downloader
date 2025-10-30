const INVALID_FILENAME_CHARS = /[<>:"/\\|?*\u0000-\u001F]/g;
const MAX_FILENAME_LENGTH = 180;

function sanitizeFilename(filename, fallbackBase) {
  if (typeof filename !== 'string') {
    return `${fallbackBase}_${Date.now()}.download`;
  }

  let cleaned = filename.trim().replace(INVALID_FILENAME_CHARS, '_');
  cleaned = cleaned.replace(/[\.\s]+$/g, '');

  if (!cleaned) {
    cleaned = `${fallbackBase}_${Date.now()}.download`;
  }

  if (cleaned.length > MAX_FILENAME_LENGTH) {
    const extensionMatch = cleaned.match(/(\.[^.]*)$/);
    const extension = extensionMatch ? extensionMatch[1].slice(0, 12) : '';
    const baseLength = MAX_FILENAME_LENGTH - extension.length;
    cleaned = `${cleaned.slice(0, baseLength)}${extension}`;
  }

  return cleaned;
}

function downloadAttachment(url, filename, metadata, onSuccess, onError) {
  try {
    if (!url) {
      throw new Error('URL parameter is required');
    }

    const safeFilename = sanitizeFilename(filename || '', 'attachment');
    const stripped = stripUrl(url) || url;

    // Log metadata for debugging
    if (metadata) {
      console.log(`Downloading: ${safeFilename}`, {
        expectedSize: metadata.size || 'unknown',
        expectedType: metadata.type || 'unknown',
        attachmentType: metadata.attachmentType || 'unknown',
        url: stripped.substring(0, 100) + '...'
      });
    }

    chrome.runtime.sendMessage(
      {
        type: 'downloadAttachment',
        payload: {
          url: stripped,
          filename: safeFilename,
          metadata: metadata || null
        }
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Failed to send message to background:', chrome.runtime.lastError);
          if (typeof onError === 'function') {
            onError(new Error(chrome.runtime.lastError.message || 'Failed to send message'));
          }
          return;
        }

        if (response?.status === 'error') {
          console.error('Background download error:', response.message);
          if (typeof onError === 'function') {
            onError(new Error(response.message || 'Download could not be completed'));
          }
          return;
        }

        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      }
    );
  } catch (error) {
    console.error('Download preparation error:', error);
    if (typeof onError === 'function') {
      onError(error);
    }
  }
}

function stripUrl(url) {
  if (!url || typeof url !== 'string') {
    return null;
  }

  const re = /^(https?:\/\/)([\w.-]+(:[\w.-]+)*@)?([\w-]+(\.[\w-]+)+)(:[0-9]+)?(\/[\w\-.~:/?#\[\]@!$&'()*+,;=]*)?$/;
  const match = url.match(re);
  return match ? match[0] : null;
}

function removeUrlImageParameters(url) {
  if (!url || typeof url !== 'string') {
    return url;
  }

  try {
    let cleanedUrl = url;

    // Remove image sizing parameters (=s, =w, =h)
    const sizePatterns = [
      /(=s\d+(?:-[a-z0-9]+)*)$/i,
      /(=w\d+(?:-h\d+)?(?:-[a-z0-9]+)*)$/i,
      /(=h\d+(?:-w\d+)?(?:-[a-z0-9]+)*)$/i,
      /([?&])sz=\d+/gi,
      /([?&])s=\d+/gi,
      /([?&])w=\d+/gi,
      /([?&])h=\d+/gi
    ];

    for (const pattern of sizePatterns) {
      cleanedUrl = cleanedUrl.replace(pattern, '');
    }

    // Remove trailing parameter separators
    cleanedUrl = cleanedUrl.replace(/[?&]$/, '');

    // Remove double separators
    cleanedUrl = cleanedUrl.replace(/&{2,}/g, '&');
    cleanedUrl = cleanedUrl.replace(/\?&/g, '?');

    return cleanedUrl;
  } catch (error) {
    console.error('Failed to clean URL:', url, error);
  }

  return url;
}