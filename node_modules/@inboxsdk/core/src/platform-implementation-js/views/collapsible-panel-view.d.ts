import TypedEmitter from 'typed-emitter';
import * as Kefir from 'kefir';
import { AppMenuItemPanelDescriptor } from '../namespaces/app-menu';
import GmailDriver from '../dom-driver/gmail/gmail-driver';
import { NavItemDescriptor } from '../dom-driver/gmail/views/gmail-nav-item-view';
import NavItemView from './nav-item-view';
export declare const NATIVE_CLASS: "aqn";
export declare const INBOXSDK_CLASS: "inboxsdk__collapsiblePanel";
export declare const panelNavItemsContainerSelector: ".inboxsdk__collapsiblePanel_navItems";
type MessageEvents = {
    /**
     * Fires when this view is destroyed.
     */
    destroy: () => void;
    /**
     * Fires when this CollapsiblePanelView's panel has a `mouseenter` event triggered.
     */
    blur: (e: MouseEvent) => void;
};
declare const CollapsiblePanelView_base: new () => TypedEmitter<MessageEvents>;
/**
 * Each AppMenuItem can have a CollapsiblePanelView.
 *
 * Typically the main action of a CollapsiblePanelView is performed when the user clicks or hovers on the app menu item.
 */
export declare class CollapsiblePanelView extends CollapsiblePanelView_base {
    #private;
    static elementSelectors: {
        /** Custom elements match this selector as well. */
        readonly NATIVE: ".aqn.oy8Mbf";
        readonly CUSTOM: ".inboxsdk__collapsiblePanel";
    };
    static elementCss: {
        readonly ACTIVE: "apV";
        readonly COLLAPSED: "aBA";
        /** A hover popover has both ACTIVE _and_ HOVER */
        readonly HOVER: "aJu";
        readonly COLLAPSED_HOVER: "bym";
        readonly PANEL_LESS: "a3W";
        readonly TOGGLE_OPEN_STATE: "aak";
        readonly SDK_ACTIVE: "inboxsdk__collapsiblePanel_active";
    };
    get loading(): boolean;
    /**
     * Updates the loading property of the CollapsiblePanelView.
     */
    setLoading(loading: boolean): void;
    get panelDescriptor(): AppMenuItemPanelDescriptor;
    set panelDescriptor(panelDescriptor: AppMenuItemPanelDescriptor);
    get element(): HTMLElement;
    get scrollablePaneElement(): Element | null;
    constructor(driver: GmailDriver, panelDescriptor: AppMenuItemPanelDescriptor);
    /**
     * Remove this CollapsiblePanelView from its parent
     */
    remove(): void;
    /**
     * @param navItemDescriptor Add a single or Kefir.Observable nav menu item to the CollapsiblePanel.
     */
    addNavItem(navItemDescriptor: NavItemDescriptor | Kefir.Observable<NavItemDescriptor, any>): NavItemView;
}
export {};
//# sourceMappingURL=collapsible-panel-view.d.ts.map