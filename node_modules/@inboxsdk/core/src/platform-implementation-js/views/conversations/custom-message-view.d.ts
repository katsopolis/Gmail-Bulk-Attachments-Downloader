import type * as Kefir from 'kefir';
import SafeEventEmitter from '../../lib/safe-event-emitter';
export interface CustomMessageDescriptor {
    collapsedEl: HTMLElement;
    headerEl: HTMLElement;
    bodyEl: HTMLElement;
    iconUrl: string;
    sortDate: Date;
}
export default class CustomMessageView extends SafeEventEmitter {
    #private;
    destroyed: boolean;
    constructor(descriptorStream: Kefir.Observable<CustomMessageDescriptor, unknown>, onReady: () => any);
    destroy(): void;
    expand(): void;
    collapse(): void;
    getElement(): HTMLElement;
    getSortDate(): Date | null;
}
//# sourceMappingURL=custom-message-view.d.ts.map