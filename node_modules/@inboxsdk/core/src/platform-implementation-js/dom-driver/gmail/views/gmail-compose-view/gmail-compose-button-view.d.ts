import * as Kefir from 'kefir';
import KeyboardShortcutHandle from '../../../../views/keyboard-shortcut-handle';
import { ButtonViewI } from '../../../../widgets/buttons/basic-button-view-controller';
export interface ButtonViewOptions {
    iconClass?: null | string;
    iconUrl?: null | string;
    title?: null | string;
    text?: null | string;
    tooltip?: null | string;
    enabled?: null | boolean;
    hasDropdown?: null | boolean;
    keyboardShortcutHandle?: null | KeyboardShortcutHandle;
    noOverflow?: null | boolean;
}
export default class GmailComposeButtonView implements ButtonViewI {
    private _element;
    private _iconElement;
    private _iconImgElement;
    private _iconClass;
    private _iconUrl;
    private _tooltip;
    private _hasDropdown;
    private _isEnabled;
    private _keyboardShortcutHandle;
    private _eventStream;
    constructor(options: ButtonViewOptions);
    destroy(): void;
    getElement(): HTMLElement;
    getEventStream(): Kefir.Observable<any, any>;
    activate(): void;
    deactivate(): void;
    addClass(className: string): void;
    removeClass(className: string): void;
    simulateHover(): void;
    setEnabled(value: boolean): void;
    isEnabled(): boolean;
    update(options: any): void;
    private _createElement;
    private _createMainElement;
    private _createIconElement;
    private _createIconImgElement;
    private _updateTooltip;
    private _updateIconUrl;
    private _updateIconClass;
    private _setEnabled;
    private _setupEventStream;
    private _setupKeyboardShortcutEvent;
    private _setupAestheticEvents;
}
//# sourceMappingURL=gmail-compose-button-view.d.ts.map