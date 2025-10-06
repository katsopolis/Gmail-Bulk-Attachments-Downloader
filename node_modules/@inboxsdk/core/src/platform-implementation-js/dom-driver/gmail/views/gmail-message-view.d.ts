import * as Kefir from 'kefir';
import type { Bus } from 'kefir-bus';
import GmailAttachmentCardView from './gmail-attachment-card-view';
import AttachmentIcon from './gmail-message-view/attachment-icon';
import type { ElementWithLifetime } from '../../../lib/dom/make-element-child-stream';
import type GmailDriver from '../gmail-driver';
import type GmailThreadView from './gmail-thread-view';
import type { Contact, MessageAttachmentIconDescriptor, MessageView, ThreadView } from '../../../../inboxsdk';
import type { VIEW_STATE } from '../../../views/conversations/message-view';
export type MessageViewDriverEventByName = {
    viewStateChange: {
        eventName: 'viewStateChange';
        newValue: VIEW_STATE;
        oldValue: VIEW_STATE;
    };
    contactHover: {
        eventName: 'contactHover';
        contact: Contact;
        contactType: string;
        messageView: MessageView;
        threadView: ThreadView;
        internal?: undefined;
    };
    replyElement: {
        change: ElementWithLifetime;
        eventName: 'replyElement';
        type: 'internal';
    };
};
export type MessageViewDriverEvents = (MessageViewDriverEventByName['viewStateChange'] | MessageViewDriverEventByName['contactHover'] | MessageViewDriverEventByName['replyElement'] | {
    eventName: 'load' | 'destroy';
} | {
    eventName: 'messageLoad';
}) & {
    type?: 'internal';
};
declare class GmailMessageView {
    #private;
    constructor(element: HTMLElement, gmailThreadView: GmailThreadView, driver: GmailDriver);
    destroy(): void;
    getEventStream(): Bus<MessageViewDriverEvents, unknown>;
    getReplyElementStream(): Kefir.Observable<ElementWithLifetime, unknown>;
    getElement(): HTMLElement;
    getThreadViewDriver(): GmailThreadView;
    isLoaded(): boolean;
    getContentsElement(): HTMLElement;
    isElementInQuotedArea(element: HTMLElement): boolean;
    getSender(): Contact;
    getRecipients(): Array<Contact>;
    getRecipientEmailAddresses(): Array<string>;
    getRecipientsFull(): Promise<Array<Contact>>;
    getDateString(): string;
    getDate(): Promise<number | null | undefined>;
    getAttachmentCardViewDrivers(): GmailAttachmentCardView[];
    addButtonToDownloadAllArea(options: Record<string, any>): void;
    addMoreMenuItem(options: Record<string, any>): void;
    getMessageID(ignoreLoadStatus?: boolean): string;
    getMessageIDAsync(): Promise<string>;
    addAttachmentIcon(iconDescriptor: MessageAttachmentIconDescriptor | Kefir.Observable<MessageAttachmentIconDescriptor, never>): AttachmentIcon;
    getViewState(): VIEW_STATE;
    hasOpenReply(): boolean;
    addAttachmentCard(options: Record<string, any>): GmailAttachmentCardView;
    getReadyStream(): Kefir.Observable<null, unknown>;
}
export default GmailMessageView;
//# sourceMappingURL=gmail-message-view.d.ts.map