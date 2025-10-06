import type Membrane from '../../lib/Membrane';
import type AttachmentCardView from './attachment-card-view';
import type { Driver } from '../../driver-interfaces/driver';
import type { Contact, MessageAttachmentIconDescriptor } from '../../../inboxsdk';
import type { MessageViewDriverEventByName } from '../../dom-driver/gmail/views/gmail-message-view';
import type TypedEventEmitter from 'typed-emitter';
import type MessageViewDriver from '../../dom-driver/gmail/views/gmail-message-view';
import ThreadView from './thread-view';
import { Descriptor } from '../../../types/descriptor';
export type VIEW_STATE = 'HIDDEN' | 'COLLAPSED' | 'EXPANDED';
export type MessageViewToolbarSectionNames = 'MORE';
export interface MessageViewToolbarButtonDescriptor {
    section: MessageViewToolbarSectionNames;
    title: string;
    iconUrl?: string;
    iconClass?: string;
    onClick: (e: MouseEvent) => void;
    orderHint?: number;
}
interface MessageViewLinkDescriptor {
    text: string;
    html: string;
    element: HTMLElement;
    href: string;
    isInQuotedArea: boolean;
}
export type MessageViewEvent = {
    contactHover(data: Omit<MessageViewDriverEventByName['contactHover'], 'eventName'>): void;
    destroy(): void;
    load(data: {
        messageView: MessageView;
    }): void;
    viewStateChange(data: {
        oldViewState: VIEW_STATE;
        newViewState: VIEW_STATE;
        messageView: MessageView;
    }): void;
};
declare const MessageView_base: new () => TypedEventEmitter<MessageViewEvent>;
/**
 * Represents a visible message in the UI. There are properties to access data about the message itself as well as change the state of the UI. MessageViews have a view state as well as a loaded state. These 2 properties are orthogonal to each other.

 * A messages' view state can be one of {@link MessageViewViewStates.EXPANDED}, {@link MessageViewViewStates.COLLAPSED} or {@link MessageViewViewStates.HIDDEN}. Gmail visually display messages in a thread in different ways depending on what they are trying to show a user. These values are described in the enum MessageViewViewStates. The load state of a message determines whether all of the data pertaining to a message has been loaded in the UI. In some case, not all the information (such as recipients or the body) may be loaded, typically when the the view state is COLLAPSED or HIDDEN.

 * @note You should not depend on any relationship between the view state
 * and load state. Instead, use the provided {MessageView#getViewState} and {MessageView#isLoaded} methods.
 */
export default class MessageView extends MessageView_base {
    #private;
    destroyed: boolean;
    constructor(messageViewImplementation: MessageViewDriver, membrane: Membrane, driver: Driver);
    addAttachmentCardView(cardOptions: Record<string, any>): AttachmentCardView;
    addAttachmentCardViewNoPreview(cardOptions: Record<string, any>): AttachmentCardView;
    addAttachmentsToolbarButton(buttonOptions: Record<string, any>): void;
    addToolbarButton(buttonOptions: MessageViewToolbarButtonDescriptor): void;
    getElement(): HTMLElement;
    getBodyElement(): HTMLElement;
    getMessageID(): string;
    getMessageIDAsync(): Promise<string>;
    getFileAttachmentCardViews(): Array<AttachmentCardView>;
    getAttachmentCardViews(): Array<AttachmentCardView>;
    isElementInQuotedArea(element: HTMLElement): boolean;
    /**
     * Returns whether this message has been loaded yet. If the message has not been loaded, some of the data related methods on this object may return empty results. The message may be loaded once the user clicks on the message stub.
     */
    isLoaded(): boolean;
    getLinksInBody(): Array<MessageViewLinkDescriptor>;
    /**
     * Get the contact of the sender of this message.
  
      * @returns {Contact} The contact of the sender of this message.
      * @throws {Error} If the message has not been loaded yet.
      *
      * @note If you're using this method on an array of {MessageView}s returned by {@link ThreadRowView#getMessageViewsAll}, make sure to check {@link MessageView#isLoaded} before calling this method.
     */
    getSender(): Contact;
    getRecipients(): Array<Contact>;
    getRecipientEmailAddresses(): Array<string>;
    getRecipientsFull(): Promise<Array<Contact>>;
    getThreadView(): ThreadView;
    getDateString(): string;
    addAttachmentIcon(iconDescriptor: Descriptor<MessageAttachmentIconDescriptor, never>): import("../../dom-driver/gmail/views/gmail-message-view/attachment-icon").default;
    getViewState(): VIEW_STATE;
    hasOpenReply(): boolean;
}
export {};
//# sourceMappingURL=message-view.d.ts.map