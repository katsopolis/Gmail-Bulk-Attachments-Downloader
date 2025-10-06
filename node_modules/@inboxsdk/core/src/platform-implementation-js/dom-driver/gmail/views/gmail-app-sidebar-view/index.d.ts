import * as Kefir from 'kefir';
import ContentPanelViewDriver, { type ContentPanelDescriptor } from '../../../../driver-common/sidebar/ContentPanelViewDriver';
import type GmailDriver from '../../gmail-driver';
import type GmailThreadView from '../gmail-thread-view';
/**
 * @internal
 */
declare class GmailAppSidebarView {
    #private;
    constructor(driver: GmailDriver, companionSidebarContentContainerElement: HTMLElement);
    destroy(): void;
    getStopper(): import("kefir-stopper").Stopper;
    addThreadSidebarContentPanel(descriptor: Kefir.Observable<ContentPanelDescriptor, unknown>, threadView: GmailThreadView): ContentPanelViewDriver;
    addGlobalSidebarContentPanel(descriptor: Kefir.Observable<ContentPanelDescriptor, unknown>): ContentPanelViewDriver;
}
export default GmailAppSidebarView;
//# sourceMappingURL=index.d.ts.map