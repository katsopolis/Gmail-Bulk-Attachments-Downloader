import * as Kefir from 'kefir';
import { ButtonViewI } from '../../../../widgets/buttons/basic-button-view-controller';
export interface ButtonViewOptions {
    text?: null | string;
    title?: null | string;
    tooltip?: null | string;
    enabled?: null | boolean;
    buttonColor?: null | string;
    isPrimary?: boolean;
}
export default class ModalButtonView implements ButtonViewI {
    private _element;
    private _title;
    private _tooltip;
    private _buttonColor;
    private _eventStream;
    private _isEnabled;
    constructor(options: ButtonViewOptions);
    addClass(_className: string): void;
    removeClass(_className: string): void;
    activate(): void;
    deactivate(): void;
    destroy(): void;
    getElement(): HTMLElement;
    getEventStream(): Kefir.Observable<any, any>;
    setEnabled(value: boolean): void;
    update(): void;
    isEnabled(): boolean;
    private _createElement;
    private _setEnabled;
    private _setupEventStream;
}
//# sourceMappingURL=modal-button-view.d.ts.map