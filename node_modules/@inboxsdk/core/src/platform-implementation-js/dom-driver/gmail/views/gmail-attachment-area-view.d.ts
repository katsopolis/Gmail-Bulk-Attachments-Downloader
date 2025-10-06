import type GmailDriver from '../gmail-driver';
import type GmailMessageView from './gmail-message-view';
import GmailAttachmentCardView from './gmail-attachment-card-view';
declare class GmailAttachmentAreaView {
    _element: HTMLElement;
    _messageViewDriver: GmailMessageView;
    _driver: GmailDriver;
    _elsToCardViews: WeakMap<HTMLElement, GmailAttachmentCardView>;
    constructor(element: HTMLElement | null | undefined, driver: GmailDriver, messageViewDriver: GmailMessageView);
    destroy(): void;
    getElement(): HTMLElement;
    getAttachmentCardViews(): GmailAttachmentCardView[];
    _setupElement(): void;
    _createAreaToolbarIfNeeded(): HTMLElement;
    _updateToolbarCardCount(): void;
    addGmailAttachmentCardView(gmailAttachmentCardView: GmailAttachmentCardView): void;
    addButtonToDownloadAllArea(options: Record<string, any>): void;
}
export default GmailAttachmentAreaView;
//# sourceMappingURL=gmail-attachment-area-view.d.ts.map