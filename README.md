# Gmail Bulk Attachments Downloader

![Extension logo](img/logo_128-revert.png)

Gmail Bulk Attachments Downloader adds a toolbar button that downloads every attachment in the open Gmail conversation with a single click, preserving each file's original name, format, and size.

## Key Features
- Uses InboxSDK to request Gmail's official attachment download URLs instead of thumbnail proxies.
- Sanitises filenames so Chrome writes the exact Gmail title safely to disk.
- Falls back to DOM metadata when Gmail delays the download URL.
- Skips Drive items when Gmail refuses to expose the original link and logs a warning so you can fetch them manually if needed.

## Preview
Below is the toolbar button added by the extension:

![Toolbar button](img/screenshot1.png)

## Installation
1. Download or clone this repository (GmailBulkAttachmentsDownload).
2. Open chrome://extensions in a Chromium-based browser and enable **Developer mode**.
3. Choose **Load unpacked** and select the GmailBulkAttachmentsDownload folder.

## Usage
1. Open any Gmail thread that contains attachments.
2. Click the download button that appears next to the built-in Drive actions.
3. Chrome queues individual downloads for every attachment using the original filenames. Check DevTools for warnings about Drive files that require manual retrieval.

## Manifest Notes
- Manifest V3 now ships with an inline description and author credit, removing the need for locale message bundles.
- Background downloads return explicit success or error responses, keeping the message channel stable during bulk transfers.
- Extension version bumped to **1.0.1** to track the latest styling and manifest updates.

## Recent Updates

### Version 1.0.2 - Performance & Analysis Optimization (Latest)
- **Metadata Extraction**: Now extracts and logs file size, MIME type, and attachment type for each download
- **URL Validation**: Detects and warns about proxy/thumbnail URLs that may differ from original files
- **Enhanced URL Cleaning**: Improved parameter removal to prevent downloading thumbnails instead of full files
- **Download Tracking**: Real-time progress monitoring with size verification after download completion
- **Better Error Handling**: Replaced Turkish error messages with English, added detailed logging throughout
- **DOM Fallback Improvements**: Prioritized URL extraction logic to prefer original file URLs over thumbnails
- **File Type Detection**: Infers MIME types from file extensions with support for 30+ common formats

### Previous Updates
- Rebranded the project and extension as **Gmail Bulk Attachments Downloader** with refreshed toolbar icons.
- Ensured every attachment download depends on InboxSDK getDownloadURL() before touching the DOM.
- Added URL normalisation, filename sanitisation, and DOM fallbacks to avoid JPEG/WebP proxy downloads.
- Logged informative warnings when Gmail withholds a Drive URL so you can connect a Gmail or Drive API fallback if needed.
- Normalised the toolbar icon CSS so the download button aligns with Gmail's native Drive action.

## Technical Improvements

### File Size & Type Accuracy
The extension now addresses the common issue where downloaded files differ from Gmail's attachment metadata:
- Extracts file size from attachment card DOM elements
- Infers MIME types from file extensions
- Logs expected vs actual file sizes after download
- Warns when URLs may point to thumbnails or proxies instead of original files

### URL Quality Detection
The extension validates download URLs and warns about potential issues:
- Detects image sizing parameters (=s, =w, =h, sz=)
- Identifies proxy indicators (&disp=inline)
- Prioritizes mail-attachment.googleusercontent.com URLs over image proxies
- Enhanced parameter stripping to ensure original file download

## License
This project is released under the MIT License. See [LICENSE](LICENSE) for details.

## Author
Katsopolis
