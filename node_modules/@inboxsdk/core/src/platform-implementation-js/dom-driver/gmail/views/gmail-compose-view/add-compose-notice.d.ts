import SimpleElementView from '../../../../views/SimpleElementView';
import type GmailComposeView from '../gmail-compose-view';
export default function addComposeNotice(gmailComposeView: GmailComposeView, options: {
    orderHint?: number;
}): ComposeNotice;
declare class ComposeNotice extends SimpleElementView {
    _gmailComposeView: GmailComposeView;
    _orderHint: number;
    _stopper: import("kefir-stopper").Stopper;
    constructor(gmailComposeView: GmailComposeView, orderHint: number);
    destroy(): void;
    _setComposeNotice(): void;
}
export {};
//# sourceMappingURL=add-compose-notice.d.ts.map