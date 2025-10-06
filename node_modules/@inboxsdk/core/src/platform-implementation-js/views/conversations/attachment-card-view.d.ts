import type Membrane from '../../lib/Membrane';
import type MessageView from './message-view';
import type { Driver, AttachmentCardViewDriver } from '../../driver-interfaces/driver';
import type { CustomButtonDescriptor } from '../../dom-driver/gmail/views/gmail-attachment-card-view';
import TypedEventEmitter from 'typed-emitter';
declare const AttachmentCardView_base: new () => TypedEventEmitter<{
    destroy(): void;
}>;
export default class AttachmentCardView extends AttachmentCardView_base {
    #private;
    destroyed: boolean;
    constructor(attachmentCardImplementation: AttachmentCardViewDriver, driver: Driver, membrane: Membrane);
    getAttachmentType(): import("../../dom-driver/gmail/views/gmail-attachment-card-view").AttachmentType;
    addButton(buttonOptions: CustomButtonDescriptor): void;
    getTitle(): string;
    /**
     * Get the URL for the attachment card's download link as a promise for a string.
     * For FILE attachment cards, the URL will be a short-lived URL that can be
     * accessed without cookies. For CUSTOM attachment cards, the URL will be the
     * downloadUrl property of the card's download button if it has one, otherwise
     * null. Other attachment card types may not have a download URL, and the promise
     * may resolve to null.
     */
    getDownloadURL(): Promise<string | null | undefined>;
    getMessageView(): MessageView | null;
    private get _attachmentCardImplementation();
    getElement(): HTMLElement;
}
export {};
//# sourceMappingURL=attachment-card-view.d.ts.map