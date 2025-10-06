import * as Kefir from 'kefir';
import type { Bus } from 'kefir-bus';
export default class GmailTopMessageBarDriver {
    _element: HTMLElement | null | undefined;
    _eventStream: Bus<any, unknown>;
    _resizeObserver: ResizeObserver | null | undefined;
    constructor(optionStream: Kefir.Observable<any, unknown>);
    destroy(): void;
    getEventStream(): Kefir.Observable<any, unknown>;
    remove(): void;
    setTopMessageBarHeight(): void;
}
//# sourceMappingURL=gmail-top-message-bar-driver.d.ts.map