import EventEmitter from '../lib/safe-event-emitter';
import ComposeView from '../views/compose-view';
import type { DrawerViewDriver } from '../driver-interfaces/driver';
declare class DrawerView extends EventEmitter {
    destroyed: boolean;
    _driver: DrawerViewDriver;
    constructor(drawerViewDriver: DrawerViewDriver);
    close(): void;
    associateComposeView(composeView: ComposeView, closeWithCompose: boolean): void;
    disassociateComposeView(): void;
}
export default DrawerView;
//# sourceMappingURL=drawer-view.d.ts.map