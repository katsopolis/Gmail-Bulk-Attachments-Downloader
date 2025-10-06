import ModalView from '../widgets/modal-view';
import type { Driver } from '../driver-interfaces/driver';
import type { PiOpts } from '../platform-implementation';
/**
 * @deprecated applications should use Widgets instead.
 */
declare class Modal {
    #private;
    constructor(appId: string, driver: Driver, piOpts: PiOpts);
    /**
     * @deprecated use Widgets.showModalView
     */
    show(options: Record<string, any>): ModalView;
    createModalView(options: Record<string, any>): ModalView;
}
export default Modal;
//# sourceMappingURL=modal.d.ts.map