import EventEmitter from '../lib/safe-event-emitter';
import type { Driver } from '../driver-interfaces/driver';
import type ModalViewDriver from '../dom-driver/gmail/widgets/gmail-modal-view-driver';
declare class ModalView extends EventEmitter {
    destroyed: boolean;
    _driver: Driver;
    _modalViewDriver: ModalViewDriver | null | undefined;
    constructor(options: {
        driver: Driver;
        modalViewDriver: ModalViewDriver;
    });
    show(): void;
    setTitle(title: string): void;
    close(): void;
    addButton(): void;
}
export default ModalView;
//# sourceMappingURL=modal-view.d.ts.map