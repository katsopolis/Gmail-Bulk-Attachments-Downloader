import ModalView from '../widgets/modal-view';
import MoleView from '../widgets/mole-view';
import DrawerView from '../widgets/drawer-view';
import TopMessageBarView from '../widgets/top-message-bar-view';
import type { Driver, DrawerViewOptions } from '../driver-interfaces/driver';
import { type MoleOptions } from '../dom-driver/gmail/widgets/gmail-mole-view-driver';
import type { Widgets as IWidgets, ModalDescriptor } from '../../inboxsdk';
declare class Widgets implements IWidgets {
    constructor(appId: string, driver: Driver);
    showModalView(options: ModalDescriptor): ModalView;
    showMoleView(options: MoleOptions): MoleView;
    showTopMessageBarView(options: {
        el: Element;
    }): TopMessageBarView;
    showDrawerView(options: DrawerViewOptions): DrawerView;
    isMoleViewTitleBarLightColor(): boolean;
}
export default Widgets;
//# sourceMappingURL=widgets.d.ts.map