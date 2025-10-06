import TypedEmitter from 'typed-emitter';
import { AppMenuItemDescriptor, AppMenuItemPanelDescriptor } from '../namespaces/app-menu';
import { CollapsiblePanelView } from './collapsible-panel-view';
import GmailDriver from '../dom-driver/gmail/gmail-driver';
type MessageEvents = {
    /**
     * Fires when this AppMenuItemView's menuItem has a `mouseleave` event triggered.
     */
    blur: () => void;
    /**
     * Fires when this AppMenuItemView's menuItem has a `click` event triggered.
     */
    click: () => void;
    /**
     * Fires when this AppMenuItemView's menuItem has a `mouseenter` event triggered.
     */
    hover: () => void;
    destroy: () => void;
};
declare const AppMenuItemView_base: new () => TypedEmitter<MessageEvents>;
/**
 * Each AppMenuItemView represents an entry in the app menu of Gmail. Typically the main action of a AppMenuItemView is performed when the user clicks or hovers on the app menu item.
 *
 * @note Contains both a native Gmail app menu item and a collapsible panel.
 */
export declare class AppMenuItemView extends AppMenuItemView_base {
    #private;
    static getAllPanels(): HTMLElement[];
    static getActivePanel(useSdkActiveSelector?: boolean): HTMLElement | null | undefined;
    static deactivatePanel(panel: HTMLElement): void;
    static isMenuItem(element: HTMLElement): boolean;
    static getAllMenuItems(): HTMLElement[];
    static getActiveMenuItem(): HTMLElement | null | undefined;
    static deactivateMenuItem(menuItem: HTMLElement): void;
    get menuItemDescriptor(): AppMenuItemDescriptor;
    constructor(driver: GmailDriver, menuItemDescriptor: AppMenuItemDescriptor);
    /**
     * Add a panel to an AppMenuItemView.
     *
     * @param panelDescriptor A single descriptor for the app menu item panel.
     *
     * @returns A promise that resolves to the CollapsiblePanelView instance. The result is undefined if the SDK doesn't detect the AppMenu being shown.
     */
    addCollapsiblePanel(panelDescriptor: AppMenuItemPanelDescriptor): Promise<CollapsiblePanelView | undefined>;
    /**
     * Updates the AppMenuItem's AppMenuItemDescriptor
     *
     * @param menuItemDescriptor The new descriptor for the app menu item panel.
     */
    update(menuItemDescriptor: AppMenuItemDescriptor): Promise<void>;
    /**
     * Remove this AppMenuItemView from its parent
     */
    remove(): void;
}
export {};
//# sourceMappingURL=app-menu-item-view.d.ts.map