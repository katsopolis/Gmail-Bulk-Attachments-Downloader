import EventEmitter from '../lib/safe-event-emitter';
export default class KeyboardShortcutHandle extends EventEmitter {
    chord: string;
    description: string;
    constructor(chord: string, description: string);
    remove(): void;
}
//# sourceMappingURL=keyboard-shortcut-handle.d.ts.map