import { Observable } from 'kefir';
import type { Driver } from '../driver-interfaces/driver';
import type GmailNavItemView from '../dom-driver/gmail/views/gmail-nav-item-view';
import type { NavItemDescriptor } from '../dom-driver/gmail/views/gmail-nav-item-view';
import type { Descriptor } from '../../types/descriptor';
import type TypedEventEmitter from 'typed-emitter';
declare const NavItemView_base: new () => TypedEventEmitter<{
    collapsed(): void;
    destroy(): void;
    expanded(): void;
    inserted(): void;
}>;
export default class NavItemView extends NavItemView_base {
    #private;
    destroyed: boolean;
    constructor(appId: string, driver: Driver, navItemDescriptorPropertyStream: Observable<NavItemDescriptor, unknown>, navItemViewDriverPromise: Promise<GmailNavItemView>);
    addNavItem(navItemDescriptor: Descriptor<NavItemDescriptor | null>): NavItemView;
    remove(): void;
    isCollapsed(): boolean;
    setCollapsed(collapseValue: boolean): void;
    getElement(): Promise<HTMLElement>;
}
export {};
//# sourceMappingURL=nav-item-view.d.ts.map