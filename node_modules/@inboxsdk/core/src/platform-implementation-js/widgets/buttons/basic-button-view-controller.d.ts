import * as Kefir from 'kefir';
export interface ButtonViewI {
    addClass(className: string): void;
    removeClass(className: string): void;
    update(options: Options): void;
    getEventStream(): Kefir.Observable<any, any>;
    getElement(): HTMLElement;
    setEnabled(enabled: boolean): void;
    destroy(): void;
    activate(): void;
    deactivate(): void;
}
export interface Options {
    activateFunction?: null | ((event: any) => void);
    onClick?: null | (() => void);
    buttonView: ButtonViewI;
}
export default class BasicButtonViewController {
    private _activateFunction;
    private _view;
    private _stopper;
    constructor(options: Options);
    getStopper(): Kefir.Observable<null, never>;
    destroy(): void;
    update(options: Options): void;
    getView(): ButtonViewI;
    setActivateFunction(f: null | undefined | ((event: any) => void)): void;
    activate(): void;
}
//# sourceMappingURL=basic-button-view-controller.d.ts.map