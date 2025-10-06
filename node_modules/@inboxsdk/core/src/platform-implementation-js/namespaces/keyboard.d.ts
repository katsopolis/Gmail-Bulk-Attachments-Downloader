import KeyboardShortcutHandle from '../views/keyboard-shortcut-handle';
import type { Driver } from '../driver-interfaces/driver';
declare class Keyboard {
    constructor(appId: string, appName: string | null | undefined, appIconUrl: string | null | undefined, driver: Driver);
    createShortcutHandle(shortcutDescriptor: {
        chord: string;
        description: string;
    }): KeyboardShortcutHandle;
}
export default Keyboard;
//# sourceMappingURL=keyboard.d.ts.map