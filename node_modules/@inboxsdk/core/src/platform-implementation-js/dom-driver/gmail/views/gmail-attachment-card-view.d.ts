import * as Kefir from 'kefir';
import type GmailDriver from '../gmail-driver';
import type GmailMessageView from './gmail-message-view';
import ButtonView from '../widgets/buttons/button-view';
export interface CustomButtonDescriptor {
    iconUrl?: string;
    tooltip?: string;
    onClick?: (event?: {
        getDownloadURL: () => Promise<string | null>;
    }) => void;
}
export type AttachmentType = 'FILE' | 'DRIVE' | 'CUSTOM' | 'UNKNOWN' | 'UNLOADED';
declare class GmailAttachmentCardView {
    _element: HTMLElement;
    _driver: GmailDriver;
    _messageViewDriver: GmailMessageView | null | undefined;
    _cachedType: AttachmentType | undefined;
    _stopper: Kefir.Observable<null, unknown> & {
        destroy(): void;
    };
    _previewClicks: Kefir.Pool<Event, unknown>;
    constructor(options: Record<string, any>, driver: GmailDriver, messageViewDriver?: GmailMessageView | null);
    destroy(): void;
    getElement(): HTMLElement;
    getMessageViewDriver(): GmailMessageView | null | undefined;
    getStopper(): Kefir.Observable<null, unknown> & {
        destroy(): void;
    };
    getPreviewClicks(): Kefir.Observable<Event, unknown>;
    _isStandardAttachment(): boolean;
    getAttachmentType(): AttachmentType;
    _readAttachmentType(): "FILE" | "DRIVE" | "CUSTOM" | "UNKNOWN" | "UNLOADED";
    addButton(options: CustomButtonDescriptor): void;
    getTitle(): string;
    _getDownloadLink(): string | null | undefined;
    getDownloadURL(): Promise<string | null>;
    _extractFileNameFromElement(): string;
    _createNewElement(options: Record<string, any>): void;
    _addHoverEvents(): void;
    _addDownloadButton(options: Record<string, any>): void;
    _addMoreButtons(buttonDescriptors: Record<string, any>[] | null | undefined): void;
    _addButton(buttonView: ButtonView): void;
    _getPreviewImageUrl(): string | null | undefined;
    _getPreviewImage(): HTMLImageElement;
    _getButtonContainerElement(): HTMLElement;
}
export default GmailAttachmentCardView;
//# sourceMappingURL=gmail-attachment-card-view.d.ts.map