import ComposeButtonView from './compose-button-view';
import type Membrane from '../lib/Membrane';
import type { Driver } from '../driver-interfaces/driver';
import type { ComposeViewDriver, ComposeNotice, StatusBar, ComposeButtonDescriptor } from '../driver-interfaces/compose-view-driver';
import type { Contact } from '../../inboxsdk';
import type TypedEventEmitter from 'typed-emitter';
import type { AddressChangeEventName, RecipientsChangedEvent } from '../dom-driver/gmail/views/gmail-compose-view/get-address-changes-stream';
import type { Descriptor } from '../../types/descriptor';
export type LinkPopOver = {
    getLinkElement(): HTMLAnchorElement;
    addSection(): LinkPopOverSection;
    getPopOverContainerElement(): HTMLElement;
    getUrlInputElement(): HTMLInputElement | null;
    getTextInputElement(): HTMLInputElement | null;
} & TypedEventEmitter<{
    close(): void;
}>;
export interface LinkPopOverSection {
    getElement(): HTMLElement;
    remove(): void;
}
type AddressChangeEventsMapped = {
    [P in AddressChangeEventName]: (data: {
        contact: Contact;
    }) => void;
};
export type ComposeViewEvent = {
    newListener: (eventName: string) => void;
    close(): void;
    bodyChanged(): void;
    buttonAdded(): void;
    discardCanceled(): void;
    draftSaved(): void;
    fullscreenChanged(data: {
        fullscreen: boolean;
    }): void;
    linkPopOver(data: LinkPopOver): void;
    minimized(): void;
    recipientsChanged(data: RecipientsChangedEvent): void;
    resize(): void;
    restored(): void;
    sendCanceled(): void;
    sending(): void;
    sent(data: {
        getMessageID(): Promise<string>;
        getThreadID(): Promise<string>;
    }): void;
    subjectChanged(): void;
    destroy(data: {
        /**
         * If the composeView was closed without being sent and the draft was saved, then this property will have the draft's message ID after it saved. Otherwise it will be null.
         */
        messageID: string | null | undefined;
        /**
         * Whether or not the ComposeView was closed by an extension calling ComposeView.close(), including other extensions besides your own. False if the ComposeView was closed due to a user action like clicking the discard/close buttons or hitting escape
         */
        closedByInboxSDK: boolean;
    }): void;
    discard(data: {
        cancel(): void;
    }): void;
    responseTypeChanged(data: {
        isForward: boolean;
    }): void;
    presending(data: {
        cancel(): void;
    }): void;
    scheduleSendMenuOpening(data: {
        cancel(): void;
    }): void;
    scheduleSendMenuOpenCanceled(): void;
    messageIDChange(data: string | null | undefined): void;
} & AddressChangeEventsMapped;
declare const ComposeView_base: new () => TypedEventEmitter<ComposeViewEvent>;
export default class ComposeView extends ComposeView_base {
    destroyed: boolean;
    constructor(driver: Driver, composeViewImplementation: ComposeViewDriver, membrane: Membrane);
    /**
     * Inserts a button into the compose bar. This method also accepts a stream of {@link ComposeButtonDescriptor}s so that you can change the appearance of your button after you've added it.
     *
     * @param buttonDescriptor The details of the button to add to the compose bar.
     */
    addButton(buttonDescriptor: Descriptor<ComposeButtonDescriptor | null | undefined>): ComposeButtonView;
    addComposeNotice(composeNoticeDescriptor?: {
        height?: number;
        orderHint?: number;
    }): ComposeNotice;
    addStatusBar(statusBarDescriptor?: {
        height?: number;
        orderHint?: number;
        addAboveNativeStatusBar?: boolean;
    }): StatusBar;
    hideNativeStatusBar(): () => void;
    addRecipientRow(options: any): {
        destroy(): void;
    };
    forceRecipientRowsOpen(): () => void;
    hideNativeRecipientRows(): () => void;
    hideRecipientArea(): () => void;
    close(): void;
    send({ sendAndArchive }?: {
        sendAndArchive: boolean;
    }): void;
    openScheduleSendMenu(): void;
    discard(): void;
    getMetadataForm(): HTMLElement;
    getSubjectInput(): HTMLInputElement;
    getBodyElement(): HTMLElement;
    getComposeID(): string;
    getInitialMessageID(): string;
    getMessageID(): string;
    getThreadID(): string;
    getDraftID(): Promise<string | undefined | null>;
    getCurrentDraftID(): Promise<string | null | undefined>;
    getHTMLContent(): string;
    getSelectedBodyHTML(): string | null | void;
    getSelectedBodyText(): string | null | void;
    getSubject(): string;
    getTextContent(): string;
    getToRecipients(): Contact[];
    getCcRecipients(): Contact[];
    getBccRecipients(): Contact[];
    insertTextIntoBodyAtCursor(text: string): HTMLElement | null | void;
    insertHTMLIntoBodyAtCursor(html: string): HTMLElement | null | undefined;
    insertLinkChipIntoBodyAtCursor(text: string, url: string, iconUrl: string): HTMLElement | void;
    insertLinkIntoBodyAtCursor(text: string, url: string): HTMLElement | null | void;
    isForward(): boolean;
    isInlineReplyForm(): boolean;
    isFullscreen(): boolean;
    setFullscreen(fullscreen: boolean): void;
    isMinimized(): boolean;
    setMinimized(minimized: boolean): void;
    setTitleBarColor(color: string): () => void;
    setTitleBarText(text: string): () => void;
    popOut(): Promise<ComposeView>;
    isReply(): boolean;
    setToRecipients(emails: string[]): void;
    setCcRecipients(emails: string[]): void;
    setBccRecipients(emails: string[]): void;
    getFromContact(): Contact;
    getFromContactChoices(): Contact[];
    setFromEmail(email: string): void;
    setSubject(text: string): void;
    setBodyHTML(html: string): void;
    setBodyText(text: string): void;
    attachFiles(files: Blob[]): Promise<void>;
    attachInlineFiles(files: Blob[]): Promise<void>;
    dragFilesIntoCompose(files: Blob[]): Promise<void>;
    getElement(): HTMLElement;
    registerRequestModifier(modifier: (composeParams: {
        body: string;
        isPlainText?: boolean;
    }) => {
        body: string;
    } | Promise<{
        body: string;
    }>): void;
    replaceSendButton({ el }: {
        el: HTMLElement;
    }): () => void;
    hideDiscardButton(): () => void;
    ensureFormattingToolbarIsHidden(): void;
    ensureAppButtonToolbarsAreClosed(): void;
    overrideEditSubject(): void;
}
export {};
//# sourceMappingURL=compose-view.d.ts.map