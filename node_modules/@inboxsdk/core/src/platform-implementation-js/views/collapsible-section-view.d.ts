import type { Driver } from '../driver-interfaces/driver';
import type GmailCollapsibleSectionView from '../dom-driver/gmail/views/gmail-collapsible-section-view';
import TypedEventEmitter from 'typed-emitter';
export type ViewEvent = {
    collapsed(): void;
    destroy(): void;
    expanded(): void;
    footerClicked(): void;
    rowClicked(): void;
    titleLinkClicked(): void;
};
declare const CollapsibleSectionView_base: new () => TypedEventEmitter<ViewEvent>;
/**
* {@link CollapsibleSectionView}s allow you to display additional content on ListRouteViews. They are typically rendered as additional content above the list of threads below. The visual style is similar to that of multiple inbox sections used in native Gmail. Note that the rendering may vary slightly depending on the actual ListRouteView that the {@link CollapsibleSectionView} is rendered in. For example, {@link CollapsibleSectionViews} rendered on search results pages use different header styles to match Gmail's style more accurately.

 * You can either render rows (that are visually similar to Gmail rows) or custom content in your {@link CollapsibleSectionView}. Until content is provided, the SectionView will simply display a "Loading..." indicator.
 *
 * @see ListRouteView.addCollapsibleSection for more information.
 * @todo the docs mention this class extending SectionView. That doesn't seem to be the case.
*/
declare class CollapsibleSectionView extends CollapsibleSectionView_base {
    #private;
    /** This property is set to true once the view is destroyed. */
    destroyed: boolean;
    constructor(collapsibleSectionViewDriver: GmailCollapsibleSectionView, driver: Driver);
    setCollapsed(value: boolean): void;
    /** Removes this section from the current Route */
    remove(): void;
    destroy(): void;
}
export default CollapsibleSectionView;
//# sourceMappingURL=collapsible-section-view.d.ts.map