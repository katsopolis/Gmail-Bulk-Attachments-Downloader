import SafeEventEmitter from '../lib/safe-event-emitter';
export default class SimpleElementView extends SafeEventEmitter {
    el: HTMLElement;
    destroyed: boolean;
    constructor(el: HTMLElement);
    destroy(): void;
}
//# sourceMappingURL=SimpleElementView.d.ts.map