import * as Kefir from 'kefir';
import type { Bus } from 'kefir-bus';
declare class InboxBackdrop {
    _preAutoCloseStream: Bus<Record<string, any>, unknown>;
    _stopper: Kefir.Observable<null, unknown> & {
        destroy(): void;
    };
    _el: HTMLElement;
    constructor(zIndex?: number, target?: HTMLElement);
    getElement(): HTMLElement;
    getPreAutoCloseStream(): Kefir.Observable<Record<string, any>, unknown>;
    getStopper(): Kefir.Observable<null, unknown>;
    destroy(): void;
}
export default InboxBackdrop;
//# sourceMappingURL=inbox-backdrop.d.ts.map