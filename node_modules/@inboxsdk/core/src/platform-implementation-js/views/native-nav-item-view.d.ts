import EventEmitter from '../lib/safe-event-emitter';
import NavItemView from './nav-item-view';
import type { Driver } from '../driver-interfaces/driver';
import type GmailNavItemView from '../dom-driver/gmail/views/gmail-nav-item-view';
import type { NavItemDescriptor } from '../dom-driver/gmail/views/gmail-nav-item-view';
export default class NativeNavItemView extends EventEmitter {
    constructor(appId: string, driver: Driver, labelName: string, navItemViewDriverPromise: Promise<GmailNavItemView>);
    addNavItem(navItemDescriptor: NavItemDescriptor): NavItemView;
    isCollapsed(): boolean;
    setCollapsed(collapseValue: boolean): void;
}
//# sourceMappingURL=native-nav-item-view.d.ts.map