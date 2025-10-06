import * as Kefir from 'kefir';
import { ButtonViewI } from '../../../../widgets/buttons/basic-button-view-controller';
export default class CreateParentAccessoryButtonView implements ButtonViewI {
    private _element;
    private _eventStream;
    private _stopper;
    constructor();
    addClass(_className: string): void;
    removeClass(_className: string): void;
    activate(): void;
    deactivate(): void;
    destroy(): void;
    getElement(): HTMLElement;
    getEventStream(): Kefir.Observable<any, any>;
    setEnabled(): void;
    update(): void;
    private _setupElement;
    private _setupEventStream;
}
//# sourceMappingURL=create-parent-accessory-button-view.d.ts.map