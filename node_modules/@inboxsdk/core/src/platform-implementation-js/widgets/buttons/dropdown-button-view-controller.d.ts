import * as Kefir from 'kefir';
import ButtonView from '../../dom-driver/gmail/widgets/buttons/button-view';
export default class DropdownButtonViewController {
    private _view;
    private _dropdownShowFunction;
    private _dropdownView;
    private readonly _DropdownViewDriverClass;
    private _dropdownPositionOptions;
    private readonly _stopper;
    constructor(options: any);
    getStopper(): Kefir.Observable<null, never>;
    destroy(): void;
    update(options: any): void;
    getView(): ButtonView;
    setDropdownShowFunction(func: Function | null | undefined): void;
    showDropdown(): void;
    hideDropdown(): void;
    isDropdownVisible(): boolean;
    private _bindToViewEvents;
    private _toggleDropdownState;
    private _dropdownClosed;
}
//# sourceMappingURL=dropdown-button-view-controller.d.ts.map