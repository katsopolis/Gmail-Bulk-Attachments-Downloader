import RouteView from './route-view';
import CollapsibleSectionView from '../collapsible-section-view';
import SectionView from '../section-view';
import type { RouteViewDriver } from '../../driver-interfaces/route-view-driver';
import type { Driver } from '../../driver-interfaces/driver';
import type { SectionDescriptor } from '../../../inboxsdk';
import type { Descriptor } from '../../../types/descriptor';
/**
 * Extends {@link RouteView}. {@link ListRouteView}s represent pages within Gmail that show a list of emails. Typical examples are the Inbox, Sent Mail, Drafts, etc. However, views like the Conversation view or Settings would not be a ListRouteView.
 */
declare class ListRouteView extends RouteView {
    #private;
    constructor(routeViewDriver: RouteViewDriver, driver: Driver, appId: string);
    /**
     * Adds a collapsible section to the top of the page.
     */
    addCollapsibleSection(collapsibleSectionDescriptor: Descriptor<SectionDescriptor | null | undefined>): CollapsibleSectionView;
    /** Adds a non-collapsible section to the top of the page. */
    addSection(sectionDescriptor: Descriptor<SectionDescriptor | null | undefined>): SectionView;
    /**
     * Hides the search filter toolbar that appears on search pages.
     *
     * This method may not support other pages such as the Sent page, even though
     * it has a very similar filter toolbar.
     */
    hideSearchPageFilterToolbar(): void;
    /** Simulates a click on the Gmail thread list refresh button. */
    refresh(): void;
}
export default ListRouteView;
//# sourceMappingURL=list-route-view.d.ts.map