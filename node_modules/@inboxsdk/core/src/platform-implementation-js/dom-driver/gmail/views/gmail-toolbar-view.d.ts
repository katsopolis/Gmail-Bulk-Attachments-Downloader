import * as Kefir from 'kefir';
import type { Stopper } from 'kefir-stopper';
import BasicButtonViewController from '../../../widgets/buttons/basic-button-view-controller';
import DropdownButtonViewController from '../../../widgets/buttons/dropdown-button-view-controller';
import GmailThreadView from './gmail-thread-view';
import GmailRowListView from './gmail-row-list-view';
import type GmailDriver from '../gmail-driver';
import type { RouteViewDriver } from '../../../driver-interfaces/route-view-driver';
import GmailThreadRowView from './gmail-thread-row-view';
declare class GmailToolbarView {
    _element: HTMLElement;
    _driver: GmailDriver;
    _ready: Kefir.Observable<GmailToolbarView, unknown>;
    _stopper: Stopper;
    _routeViewDriver: RouteViewDriver;
    _buttonViewControllers: Set<DropdownButtonViewController | BasicButtonViewController>;
    _moreMenuItems: Array<{
        buttonDescriptor: Record<string, any>;
    }>;
    _toolbarState: string | null | undefined;
    _threadViewDriver: GmailThreadView | null | undefined;
    _rowListViewDriver: GmailRowListView | null | undefined;
    _isUpdateButtonClassesScheduled: boolean;
    _moreMenuItemsContainer: HTMLElement | null | undefined;
    constructor(element: HTMLElement, driver: GmailDriver, routeViewDriver: RouteViewDriver, parent: GmailThreadView | GmailRowListView);
    getStopper(): Stopper;
    getElement(): HTMLElement;
    getRouteViewDriver(): RouteViewDriver;
    getThreadViewDriver(): GmailThreadView | null | undefined;
    isForRowList(): boolean;
    isForThread(): boolean;
    getThreadRowViewDrivers(): Set<GmailThreadRowView>;
    addButton(buttonDescriptor: Record<string, any>, id?: string): {
        getStopper(): Kefir.Observable<null, unknown>;
        destroy(): void;
    };
    waitForReady(): Kefir.Observable<GmailToolbarView, unknown>;
    _createButtonViewController(buttonDescriptor: Record<string, any>): DropdownButtonViewController | BasicButtonViewController;
    _getButtonView(buttonDescriptor: Record<string, any>): Record<string, any>;
    _startMonitoringMoreMenu(): void;
    _determineToolbarState(): void;
    _determineToolbarIconMode(): void;
    _setupToolbarStateMonitoring(): void;
    _getSectionElement(sectionName: string, toolbarSections: Record<string, any>): HTMLElement | null | undefined;
    _getArchiveSectionElement(): HTMLElement | null | undefined;
    _getCheckboxSectionElement(): HTMLElement | null | undefined;
    _getMoveSectionElement(): HTMLElement | null | undefined;
    _getSectionElementForButtonSelector(buttonSelector: string): HTMLElement | null | undefined;
    _updateButtonClasses(element: HTMLElement): void;
    _updateButtonEnabledState(): void;
    _addMoreItems(): void;
    _clearMoreItems(): void;
    _addToOpenMoreMenu(buttonDescriptor: Record<string, any>): void;
    _getMoreMenuItemsContainer(moreMenu: HTMLElement): HTMLElement;
    _getMoreMenuItemElement(buttonDescriptor: Record<string, any>): HTMLElement;
    destroy(): void;
}
export default GmailToolbarView;
//# sourceMappingURL=gmail-toolbar-view.d.ts.map