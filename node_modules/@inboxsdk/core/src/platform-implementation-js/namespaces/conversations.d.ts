import ThreadView from '../views/conversations/thread-view';
import MessageView from '../views/conversations/message-view';
import AttachmentCardView from '../views/conversations/attachment-card-view';
import type Membrane from '../lib/Membrane';
import type { Driver } from '../driver-interfaces/driver';
export declare const MessageViewViewStates: Readonly<{
    /**
     * One case where a {@link MessageView} is 'HIDDEN' is when there are too many messages in a thread,
     * and the message doesn't show at all.
     */
    HIDDEN: "HIDDEN";
    /**
     * {@link MessageView}s are collapsed when they are partially shown. The {@link MessageView}'s subject line and timestamp is visible, but the body of the message may be truncated.
     */
    COLLAPSED: "COLLAPSED";
    EXPANDED: "EXPANDED";
}>;
export declare const MessageViewToolbarSectionNames: Readonly<{
    MORE: "MORE";
}>;
declare class Conversations {
    MessageViewViewStates: typeof MessageViewViewStates;
    MessageViewToolbarSectionNames: typeof MessageViewToolbarSectionNames;
    constructor(appId: string, driver: Driver, membrane: Membrane);
    registerThreadViewHandler(handler: (v: ThreadView) => void): () => void;
    registerMessageViewHandler(handler: (v: MessageView) => void): () => void;
    registerMessageViewHandlerAll(handler: (v: MessageView) => void): () => void;
    registerFileAttachmentCardViewHandler(handler: (v: AttachmentCardView) => void): () => void;
}
export default Conversations;
//# sourceMappingURL=conversations.d.ts.map