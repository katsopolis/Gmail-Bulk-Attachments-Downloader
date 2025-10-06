import type { Driver } from '../driver-interfaces/driver';
import type GmailCollapsibleSectionView from '../dom-driver/gmail/views/gmail-collapsible-section-view';
import type TypedEventEmitter from 'typed-emitter';
import type { ViewEvent } from './collapsible-section-view';
declare const SectionView_base: new () => TypedEventEmitter<ViewEvent>;
/**
 * {@link SectionView}s allow you to display additional content on ListRouteViews. They are typically rendered as additional content above the list of threads below. The visual style is similar to that of multiple inbox sections used in native Gmail. Note that the rendering may vary slightly depending on the actual ListRouteView that the SectionView is rendered in. For example, SectionViews rendered on search results pages use different header styles to match Gmail's style more accurately.

 * You can either render rows (that are visually similar to Gmail rows) or custom content in your SectionView. Until content is provided, the SectionView will simply display a "Loading..." indicator. See ListRouteView.addSection for more information.
 */
declare class SectionView extends SectionView_base {
    #private;
    destroyed: boolean;
    constructor(sectionViewDriver: GmailCollapsibleSectionView, driver: Driver);
    /**
     * Removes this section from the current Route.
     */
    remove(): void;
    destroy(): void;
}
export default SectionView;
//# sourceMappingURL=section-view.d.ts.map