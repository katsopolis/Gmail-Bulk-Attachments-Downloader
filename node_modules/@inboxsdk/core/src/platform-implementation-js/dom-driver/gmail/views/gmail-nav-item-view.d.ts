import * as Kefir from 'kefir';
import { Bus } from 'kefir-bus';
import NAV_ITEM_TYPES from '../../../constants/nav-item-types';
import GmailDriver from '../gmail-driver';
import DropdownView from '../../../widgets/buttons/dropdown-view';
type CreateAccessoryDescriptor = {
    type: 'CREATE';
    onClick: () => void;
};
type IconButtonAccessoryDescriptor = {
    type: 'ICON_BUTTON';
    onClick: () => void;
    iconUrl: string;
    iconClass?: string;
};
type DropdownButtonAccessoryDescriptor = {
    type: 'DROPDOWN_BUTTON';
    onClick: (e: {
        dropdown: DropdownView;
    }) => void;
};
export type NavItemTypes = typeof NAV_ITEM_TYPES;
export type NavItemDescriptor = {
    name: string;
} & Partial<{
    key: string;
    orderHint: number;
    iconUrl: string;
    routeID: string;
    secondaryRoutes?: Array<{
        routeID: string;
        routeParams?: Record<string, string | number>;
    }>;
    iconClass: string;
    iconElement: HTMLElement;
    iconPosition: 'BEFORE_NAME';
    /** Font ligature, can't use with an IconUrl */
    iconLiga: string;
    routeParams: Record<string, string | number>;
    expanderForegroundColor: string;
    backgroundColor: string;
    onClick: () => void;
    accessory: CreateAccessoryDescriptor | IconButtonAccessoryDescriptor | DropdownButtonAccessoryDescriptor | null;
    type: keyof NavItemTypes;
    tooltipAlignment: 'left' | 'top' | 'right' | 'bottom' | null;
    subtitle: string;
    spacingAfter: boolean;
    sectionTooltip: string;
}>;
export type NavItemEvent = {
    eventName: 'collapsed' | 'expanded' | 'orderChanged';
} | {
    eventName: 'click';
    domEvent: MouseEvent;
};
export default class GmailNavItemView {
    #private;
    private _accessory;
    private _accessoryViewController;
    private _driver;
    private _element;
    private _expandoElement;
    private _iconSettings;
    private _isActive;
    private _isCollapsed;
    private _itemContainerElement;
    private _level;
    private _name;
    private _navItemDescriptor?;
    private _navItemNumber;
    private _orderGroup;
    private _orderHint;
    private _type;
    private _collapseKey;
    private _isNewLeftNavParent;
    get sectionKey(): string | undefined;
    constructor(driver: GmailDriver, orderGroup: number | string, level: number);
    addNavItem(orderGroup: number | string, navItemDescriptor: Kefir.Observable<NavItemDescriptor, unknown>): GmailNavItemView;
    destroy(): void;
    getElement(): HTMLElement;
    getEventStream(): Bus<NavItemEvent, any>;
    getNavItemDescriptor(): NavItemDescriptor | undefined;
    getOrderGroup(): number | string;
    getOrderHint(): any;
    getName(): string;
    isCollapsed(): boolean;
    isSection(): boolean;
    remove(): void;
    setActive(value: boolean): void;
    setCollapsed(value: boolean): void;
    setNavItemDescriptor(navItemDescriptorPropertyStream: Kefir.Observable<NavItemDescriptor, unknown>): void;
    toggleCollapse(): void;
    private _addNavItemElement;
    private _collapse;
    private _createAccessory;
    private _createCreateAccessory;
    private _createDropdownButtonAccessory;
    private _createExpando;
    private _createExpandoParent;
    private _createIconButtonAccessory;
    private _createItemContainerElement;
    private _createLinkButtonAccessory;
    private _createPlusButtonAccessory;
    private _expand;
    private _getItemContainerElement;
    private _isCollapsible;
    private _makeEventMapper;
    private _setHeights;
    private _setHighlight;
    private _setupContextClickHandler;
    private _setupChildElement;
    private _setupParentElement;
    private _setupGrouper;
    private _updateAccessory;
    private _updateClickability;
    private _updateHighlight;
    private _updateIcon;
    private _updateName;
    private _updateOrder;
    private _updateRole;
    private _updateSubtitle;
    private _updateType;
}
export declare function getLeftIndentationPaddingValue(): number;
export {};
//# sourceMappingURL=gmail-nav-item-view.d.ts.map