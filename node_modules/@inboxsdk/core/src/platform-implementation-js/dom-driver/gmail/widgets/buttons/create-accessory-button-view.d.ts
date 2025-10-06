import * as Kefir from 'kefir';
import { ButtonViewI } from '../../../../widgets/buttons/basic-button-view-controller';
export default class CreateAccessoryButtonView implements ButtonViewI {
    private _element;
    private _eventStream;
    private _stopper;
    constructor();
    addClass(_className: string): void;
    removeClass(_className: string): void;
    update(): void;
    setEnabled(): void;
    destroy(): void;
    getElement(): HTMLElement;
    getEventStream(): Kefir.Observable<any, any>;
    activate(): void;
    deactivate(): void;
    private _setupElement;
    private _setupEventStream;
}
//# sourceMappingURL=create-accessory-button-view.d.ts.map