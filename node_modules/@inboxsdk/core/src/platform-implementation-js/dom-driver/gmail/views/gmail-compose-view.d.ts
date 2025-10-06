import * as Kefir from 'kefir';
import type { Bus } from 'kefir-bus';
import type { Stopper } from 'kefir-stopper';
import { type AddedButtonEvents } from './gmail-compose-view/add-button';
import type { TooltipDescriptor } from '../../../views/compose-button-view';
import type { TagTree } from 'tag-tree';
import type { ComposeButtonDescriptor, ComposeNotice, ComposeViewDriverEvent, StatusBar } from '../../../driver-interfaces/compose-view-driver';
import type GmailDriver from '../gmail-driver';
import { Contact } from '../../../../inboxsdk';
import BasicButtonViewController from '../../../widgets/buttons/basic-button-view-controller';
import { type PublicOnly } from '../../../../types/public-only';
declare class GmailComposeView {
    #private;
    tagTree: TagTree<HTMLElement>;
    ready: () => Kefir.Observable<GmailComposeView, unknown>;
    constructor(element: HTMLElement, xhrInterceptorStream: Kefir.Observable<any, unknown>, driver: GmailDriver, options: {
        isInlineReplyForm: boolean;
        isStandalone: boolean;
    });
    destroy(): void;
    getStopper(): Stopper;
    getEventStream(): Bus<ComposeViewDriverEvent, unknown>;
    getGmailDriver(): GmailDriver;
    isDestroyed(): boolean;
    focus(): void;
    insertBodyTextAtCursor(text: string): HTMLElement | null | undefined;
    insertBodyHTMLAtCursor(html: string): HTMLElement | null | undefined;
    insertLinkIntoBody(text: string, href: string): HTMLElement | null | undefined;
    insertLinkChipIntoBody(options: {
        iconUrl?: string;
        url: string;
        text: string;
    }): HTMLElement;
    setSubject(text: string): void;
    setBodyHTML(html: string): void;
    setBodyText(text: string): void;
    setToRecipients(emails: string[]): void;
    setCcRecipients(emails: string[]): void;
    setBccRecipients(emails: string[]): void;
    addRecipientRow(options: Kefir.Observable<Record<string, any> | null | undefined, unknown>): () => void;
    forceRecipientRowsOpen(): () => void;
    hideNativeRecipientRows(): () => void;
    hideRecipientArea(): () => void;
    getFromContact(): Contact;
    getFromContactChoices(): Contact[];
    setFromEmail(email: string): void;
    addButton(buttonDescriptor: Kefir.Observable<ComposeButtonDescriptor | null | undefined, unknown>, groupOrderHint: string, extraOnClickOptions: Record<string, any>, bus: Bus<AddedButtonEvents, unknown>): void;
    addTooltipToButton(buttonViewController: BasicButtonViewController, buttonDescriptor: Record<string, any>, tooltipDescriptor: TooltipDescriptor): void;
    closeButtonTooltip(buttonViewController: Record<string, any>): void;
    addComposeNotice(options?: {
        orderHint?: number;
    }): ComposeNotice;
    addStatusBar(options?: {
        height?: number;
        orderHint?: number;
        addAboveNativeStatusBar?: boolean;
    }): StatusBar;
    hideNativeStatusBar(): () => void;
    replaceSendButton(el: HTMLElement): () => void;
    hideDiscardButton(): () => void;
    ensureFormattingToolbarIsHidden(): void;
    close(): void;
    send({ sendAndArchive }: {
        sendAndArchive: boolean;
    }): void;
    openScheduleSendMenu(): void;
    discard(): void;
    popOut(): void;
    overrideEditSubject(): void;
    attachFiles(files: Blob[]): Promise<void>;
    attachInlineFiles(files: Blob[]): Promise<void>;
    isForward(): boolean;
    isReply(): boolean;
    isInlineReplyForm(): boolean;
    getBodyElement(): HTMLElement;
    getMaybeBodyElement(): HTMLElement | null | undefined;
    getTopFormElement(): HTMLElement;
    getHTMLContent(): string;
    getTextContent(): string;
    getSelectedBodyHTML(): string | null | undefined;
    getSelectedBodyText(): string | null | undefined;
    getSubject(): string;
    getSubjectInput(): HTMLInputElement;
    getMetadataFormElement(): HTMLElement;
    getToRecipients(): Contact[];
    getCcRecipients(): Contact[];
    getBccRecipients(): Contact[];
    getAdditionalActionToolbar(): HTMLElement;
    updateInsertMoreAreaLeft(oldFormattingAreaOffsetLeft: number): void;
    /** @internal non-public method used outside this class */
    _getFormattingAreaOffsetLeft(): number;
    getFormattingArea(): HTMLElement | null | undefined;
    getFormattingToolbar(): HTMLElement | null | undefined;
    getFormattingToolbarArrow(): HTMLElement;
    getFormattingToolbarToggleButton(): HTMLElement;
    getStatusBarPrependContainer(): HTMLElement | null | undefined;
    getScrollBody(): HTMLElement;
    getStatusArea(): HTMLElement;
    getInsertMoreArea(): HTMLElement;
    getInsertLinkButton(): HTMLElement;
    getSendButton(): HTMLElement;
    getScheduleSendButton(): HTMLElement;
    getMoreSendOptionsButton(): HTMLElement;
    getSendButtonGroup(): HTMLElement;
    getSendAndArchiveButton(): HTMLElement | null | undefined;
    getCloseButton(): HTMLElement;
    getMoleSwitchButton(): HTMLElement;
    getBottomBarTable(): HTMLElement;
    getBottomToolbarContainer(): HTMLElement;
    getDiscardButton(): HTMLElement;
    getComposeID(): string;
    getInitialMessageID(): string | null | undefined;
    getMessageID(): string | null | undefined;
    getTargetMessageID(): string | null | undefined;
    getThreadID(): string | null | undefined;
    getCurrentDraftID(): Promise<string | null | undefined>;
    getDraftID(): Promise<string | null | undefined>;
    addManagedViewController(viewController: {
        destroy(): void;
    }): void;
    ensureGroupingIsOpen(type: string): void;
    ensureAppButtonToolbarsAreClosed(): void;
    isMinimized(): boolean;
    setMinimized(minimized: boolean): void;
    setFullscreen(fullscreen: boolean): void;
    setTitleBarColor(color: string): () => void;
    setTitleBarText(text: string): () => void;
    getElement(): HTMLElement;
    isFullscreen(): boolean;
    getLastSelectionRange(): Range | null | undefined;
    setLastSelectionRange(lastSelectionRange: Range | null | undefined): void;
    registerRequestModifier(modifier: (composeParams: {
        body: string;
        isPlainText?: boolean;
    }) => {
        body: string;
        isPlainText?: boolean;
    } | Promise<{
        body: string;
        isPlainText?: boolean;
    }>): void;
    setupLinkPopOvers(): void;
}
export type InboxSdkModifyComposeRequest = {
    type: 'inboxSDKmodifyComposeRequest';
    composeid?: string;
    draftID?: string;
    modifierId: string;
    composeParams: {
        body: string;
        isPlainText?: boolean;
    };
};
export default GmailComposeView;
export type ComposeViewDriver = PublicOnly<GmailComposeView>;
//# sourceMappingURL=gmail-compose-view.d.ts.map