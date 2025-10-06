import * as Kefir from 'kefir';
export default class GenericButtonView {
    private readonly _eventStream;
    protected readonly _element: HTMLElement;
    constructor(element: HTMLElement);
    destroy(): void;
    getElement(): HTMLElement;
    getEventStream(): Kefir.Observable<any, any>;
    activate(): void;
    deactivate(): void;
    private _setupEventStream;
}
//# sourceMappingURL=generic-button-view.d.ts.map