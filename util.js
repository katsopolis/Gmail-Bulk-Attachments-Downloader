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

function downloadAttachment(url, filename, onSuccess, onError) {
  try {
    if (!url) {
      throw new Error('URL parametresi gerekli');
    }

    const safeFilename = sanitizeFilename(filename || '', 'attachment');
    const stripped = stripUrl(url) || url;

    chrome.runtime.sendMessage(
      {
        type: 'downloadAttachment',
        payload: {
          url: stripped,
          filename: safeFilename
        }
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Mesaj g├Ânderilemedi:', chrome.runtime.lastError);
          if (typeof onError === 'function') {
            onError(new Error(chrome.runtime.lastError.message || 'Mesaj g├Ânderilemedi'));
          }
          return;
        }

        if (response?.status === 'error') {
          console.error('Arka plan indirme hatas─▒:', response.message);
          if (typeof onError === 'function') {
            onError(new Error(response.message || '─░ndirme tamamlanamad─▒'));
          }
          return;
        }

        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      }
    );
  } catch (error) {
    console.error('─░ndirme i┼şlemi haz─▒rlama hatas─▒:', error);
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
    const patterns = [
      /(=s\d+(?:-[a-z0-9]+)*)$/i,
      /(=w\d+(?:-h\d+)?(?:-[a-z0-9]+)*)$/i,
      /(=h\d+(?:-w\d+)?(?:-[a-z0-9]+)*)$/i
    ];

    for (const pattern of patterns) {
      if (pattern.test(url)) {
        return url.replace(pattern, '');
      }
    }

    return url;
  } catch (error) {
    console.error('URL temizlenemedi:', url, error);
  }

  return url;
}