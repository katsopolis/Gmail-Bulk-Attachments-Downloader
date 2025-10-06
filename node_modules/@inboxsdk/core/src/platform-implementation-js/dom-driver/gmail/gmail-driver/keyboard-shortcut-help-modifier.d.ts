import type { Stopper } from 'kefir-stopper';
import type KeyboardShortcutHandle from '../../../views/keyboard-shortcut-handle';
export default class KeyboardShortcutHelpModifier {
    _appId: string | null | undefined;
    _appName: string | null | undefined;
    _appIconUrl: string | null | undefined;
    _stopper: Stopper;
    _shortcuts: Set<KeyboardShortcutHandle>;
    constructor();
    destroy(): void;
    set(keyboardShortcutHandle: KeyboardShortcutHandle, appId: string, appName: string | null | undefined, appIconUrl: string | null | undefined): void;
    delete(keyboardShortcutHandle: KeyboardShortcutHandle): void;
    _initializeAppValues(appId: string, appName: string | null | undefined, appIconUrl: string | null | undefined): void;
    _monitorKeyboardHelp(): void;
    _renderHelp(node: HTMLElement): void;
    _renderHeader(): HTMLElement;
    _renderTable(): HTMLElement;
    _renderShortcut(tableBody: HTMLElement, keyboardShortcutHandle: KeyboardShortcutHandle): void;
}
//# sourceMappingURL=keyboard-shortcut-help-modifier.d.ts.map