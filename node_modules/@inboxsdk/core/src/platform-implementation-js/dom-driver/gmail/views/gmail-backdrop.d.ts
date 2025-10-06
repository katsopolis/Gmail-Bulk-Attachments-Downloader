import * as Kefir from 'kefir';
declare class GmailBackdrop {
    _stopper: Kefir.Observable<null, unknown> & {
        destroy(): void;
    };
    constructor(zIndex?: number, target?: HTMLElement);
    getStopper(): Kefir.Observable<null, unknown>;
    destroy(): void;
}
export default GmailBackdrop;
//# sourceMappingURL=gmail-backdrop.d.ts.map