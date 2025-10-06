import NavItemView from '../views/nav-item-view';
import NativeNavItemView from '../views/native-nav-item-view';
import type { Driver } from '../driver-interfaces/driver';
import type { NavItemDescriptor } from '../../inboxsdk';
import type { Descriptor } from '../../types/descriptor';
export default class NavMenu {
    NavItemTypes: Readonly<{
        readonly NAVIGATION: "NAVIGATION";
        readonly LINK: "LINK";
        readonly GROUPER: "GROUPER";
        readonly MANAGE: "MANAGE";
        readonly SECTION: "SECTION";
    }>;
    SENT_MAIL: NativeNavItemView;
    constructor(appId: string, driver: Driver);
    addNavItem(navItemDescriptor: Descriptor<NavItemDescriptor, unknown>): NavItemView;
    static SENT_MAIL: Record<string, any> | null | undefined;
}
//# sourceMappingURL=nav-menu.d.ts.map