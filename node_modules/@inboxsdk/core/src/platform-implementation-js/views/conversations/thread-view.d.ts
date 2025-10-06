import type Membrane from '../../lib/Membrane';
import type SimpleElementView from '../../views/SimpleElementView';
import ContentPanelView from '../content-panel-view';
import type MessageView from './message-view';
import type { Driver } from '../../driver-interfaces/driver';
import type CustomMessageView from '../../views/conversations/custom-message-view';
import type { ButtonDescriptor, Contact } from '../../../inboxsdk';
import type TypedEventEmitter from 'typed-emitter';
import { type ContentPanelDescriptor } from '../../driver-common/sidebar/ContentPanelViewDriver';
import { Descriptor } from '../../../types/descriptor';
import type GmailThreadView from '../../dom-driver/gmail/views/gmail-thread-view';
export type ThreadViewEvents = {
    destroy(): void;
    contactHover(data: {
        messageView: MessageView;
        contact: Contact;
        threadView: ThreadView;
    }): void;
};
declare const ThreadView_base: new () => TypedEventEmitter<ThreadViewEvents>;
declare class ThreadView extends ThreadView_base {
    #private;
    destroyed: boolean;
    constructor(threadViewImplementation: GmailThreadView, appId: string, driver: Driver, membrane: Membrane);
    addSidebarContentPanel(descriptor: Descriptor<ContentPanelDescriptor>): ContentPanelView;
    addNoticeBar(): SimpleElementView;
    /**
     * @alpha
     * @internal
     */
    registerHiddenCustomMessageNoticeProvider(provider: (numberCustomMessagesHidden: number, numberNativeMessagesHidden: number | null | undefined, unmountPromise: Promise<void>) => HTMLElement): void;
    /**
     * @alpha
     * @internal
     */
    addCustomMessage(descriptor: Record<string, any>): CustomMessageView;
    /**
     * @returns {MessageView[]} of all the loaded MessageView objects currently in the thread. @see MessageView for more information on what "loaded" means. Note that more messages may load into the thread later! If it's important to get future messages, use {@link Conversations#registerMessageViewHandler} instead.
     */
    getMessageViews(): Array<MessageView>;
    getMessageViewsAll(): Array<MessageView>;
    getSubject(): string;
    /**
     * @deprecated
     */
    getThreadID(): string;
    getThreadIDAsync(): Promise<string>;
    addLabel(): SimpleElementView;
    /**
     * @internal
     */
    addSubjectButton(buttonDescriptor: ButtonDescriptor): import("../../widgets/buttons/basic-button-view-controller").default;
    /**
     * @internal
     */
    addFooterButton(buttonDescriptor: ButtonDescriptor): import("../../widgets/buttons/basic-button-view-controller").default;
}
export default ThreadView;
//# sourceMappingURL=thread-view.d.ts.map