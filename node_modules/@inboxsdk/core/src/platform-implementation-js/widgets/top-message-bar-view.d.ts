import type GmailTopMessageBarDriver from '../dom-driver/gmail/widgets/gmail-top-message-bar-driver';
import EventEmitter from '../lib/safe-event-emitter';
export default class TopMessageBarView extends EventEmitter {
    constructor(options: {
        topMessageBarViewDriver: GmailTopMessageBarDriver;
    });
    remove(): void;
}
//# sourceMappingURL=top-message-bar-view.d.ts.map