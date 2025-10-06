import * as Kefir from 'kefir';
import type { Bus } from 'kefir-bus';
import GmailRowListView from '../gmail-row-list-view';
import GmailThreadView from '../gmail-thread-view';
import GmailCollapsibleSectionView from '../gmail-collapsible-section-view';
import type GmailDriver from '../../gmail-driver';
import type GmailRouteProcessor from '../gmail-route-view/gmail-route-processor';
import { type SectionDescriptor } from '../../../../../inboxsdk';
import type { RouteViewDriver } from '../../../../driver-interfaces/route-view-driver';
declare class GmailRouteView implements RouteViewDriver {
    #private;
    _type: string;
    _hash: string;
    _name: string;
    _paramsArray: string[];
    _customRouteID: string | null | undefined;
    _stopper: import("kefir-stopper").Stopper;
    _rowListViews: GmailRowListView[];
    _gmailRouteProcessor: GmailRouteProcessor;
    _eventStream: Bus<{
        eventName: 'newGmailRowListView';
        view: GmailRowListView;
    } | {
        eventName: 'newGmailThreadView';
        view: GmailThreadView;
    }, unknown>;
    _customViewElement: HTMLElement | null | undefined;
    _threadView: GmailThreadView | null | undefined;
    _hasAddedCollapsibleSection: boolean;
    _cachedRouteData: Record<string, any>;
    constructor({ urlObject, type, routeID, cachedRouteData }: Record<string, any>, gmailRouteProcessor: GmailRouteProcessor, driver: GmailDriver);
    destroy(): void;
    getHash(): string;
    getEventStream(): Bus<{
        eventName: "newGmailRowListView";
        view: GmailRowListView;
    } | {
        eventName: "newGmailThreadView";
        view: GmailThreadView;
    }, unknown>;
    getStopper(): import("kefir-stopper").Stopper;
    getCustomViewElement(): HTMLElement | null | undefined;
    getRowListViews(): GmailRowListView[];
    getThreadView(): GmailThreadView | null | undefined;
    getType(): string;
    isCustomRouteBelongingToApp(): boolean;
    getParams: () => Record<string, string>;
    addCollapsibleSection(sectionDescriptorProperty: Kefir.Observable<SectionDescriptor | null | undefined, unknown>, groupOrderHint: number): GmailCollapsibleSectionView;
    addSection(sectionDescriptorProperty: Kefir.Observable<SectionDescriptor | null | undefined, unknown>, groupOrderHint: number): GmailCollapsibleSectionView;
    hideSearchPageFilterToolbar(): void;
    _setupCustomViewElement(): void;
    _monitorLeftNavHeight(): void;
    _setCustomViewElementHeight(): void;
    _setupSubViews(): void;
    _processRowListElement(rowListElement: HTMLElement): void;
    _setupScrollStream(): void;
    _getCustomParams(): Record<string, any>;
    _getNativeParams(): Record<string, any>;
    _isSearchRoute(): boolean;
    _isChatWelcomeRoute(): boolean;
    _isChatDmRoute(): boolean;
    _isSpacesWelcomeRoute(): boolean;
    _isSpaceRoute(): boolean;
    _isMeetRoute(): boolean;
    getRouteType(): string;
    _isThreadRoute(): boolean;
    _isListRoute(): boolean;
    _isSettingsRoute(): boolean;
    _getSearchRouteParams(): Record<string, any>;
    _getListRouteParams(): Record<string, any>;
    _getThreadRouteParams(): Record<string, any>;
    _getSettingsRouteParams(): Record<string, any>;
    _getPageParam(): number;
    getRouteID(): string;
    refresh(): void;
    /** @deprecated */
    setFullWidth(): void;
    _extractParamKeysFromRouteID(routeID: string): string[];
    _getThreadContainerElement(): HTMLElement | null;
}
export default GmailRouteView;
//# sourceMappingURL=gmail-route-view.d.ts.map