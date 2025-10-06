import * as Kefir from 'kefir';
import type { Bus } from 'kefir-bus';
import GmailNavItemView from './gmail-nav-item-view';
import type GmailDriver from '../gmail-driver';
export default class NativeGmailNavItemView {
    _driver: GmailDriver;
    _element: HTMLElement;
    _navItemName: string;
    _activeMarkerElement: HTMLElement | null | undefined;
    _eventStream: Bus<any, unknown>;
    _elementBus: Bus<HTMLElement, unknown>;
    _elementStream: Kefir.Observable<HTMLElement, unknown>;
    _isActive: boolean;
    _itemContainerElement: HTMLElement | null | undefined;
    constructor(driver: GmailDriver, nativeElement: HTMLElement, navItemName: string);
    destroy(): void;
    getElement(): HTMLElement;
    getEventStream(): Bus<any, unknown>;
    addNavItem(orderGroup: number, navItemDescriptor: Kefir.Observable<any, any>): GmailNavItemView;
    setActive(value: boolean): void;
    toggleCollapse(): void;
    setCollapsed(value: string): void;
    remove(): void;
    _monitorElementForActiveChanges(): void;
    _addNavItemElement(gmailNavItemView: GmailNavItemView): void;
    _getItemContainerElement(): HTMLElement;
    _createItemContainerElement(): HTMLElement;
    _createExpando(): void;
    _toggleCollapse(): void;
    _collapse(): void;
    _expand(): void;
    _isExpanded(): boolean;
    _setHeights(): void;
    _createActiveMarkerElement(): void;
    _removeActiveMarkerElement(): void;
}
//# sourceMappingURL=native-gmail-nav-item-view.d.ts.map