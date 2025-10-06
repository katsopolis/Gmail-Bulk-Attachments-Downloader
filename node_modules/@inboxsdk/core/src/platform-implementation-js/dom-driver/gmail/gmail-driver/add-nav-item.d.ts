import * as Kefir from 'kefir';
import GmailNavItemView, { type NavItemDescriptor } from '../views/gmail-nav-item-view';
import GmailDriver from '../gmail-driver';
export default function addNavItem(driver: GmailDriver, orderGroup: string, navItemDescriptor: Kefir.Observable<NavItemDescriptor, unknown>, navMenuInjectionContainer?: HTMLElement): Promise<GmailNavItemView>;
export declare function addNavItemToPanel(driver: GmailDriver, orderGroup: string, navItemDescriptor: Kefir.Observable<NavItemDescriptor, unknown>, panelElement: HTMLElement): Promise<GmailNavItemView>;
export declare const waitForMenuReady: () => Promise<void>;
//# sourceMappingURL=add-nav-item.d.ts.map