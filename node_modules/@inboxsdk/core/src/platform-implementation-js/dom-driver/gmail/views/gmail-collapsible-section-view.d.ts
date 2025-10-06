import * as Kefir from 'kefir';
import type { Bus } from 'kefir-bus';
import type GmailDriver from '../gmail-driver';
import type { RowDescriptor, SectionDescriptor } from '../../../../inboxsdk';
type ViewEvent = {
    type: 'update';
    property: 'orderHint';
    sectionDescriptor?: SectionDescriptor;
} | {
    eventName: 'titleLinkClicked';
    sectionDescriptor: SectionDescriptor;
} | {
    eventName: 'rowClicked';
    rowDescriptor: RowDescriptor;
} | {
    eventName: 'footerClicked';
    sectionDescriptor: SectionDescriptor;
} | {
    eventName: 'collapsed';
} | {
    eventName: 'expanded';
};
declare class GmailCollapsibleSectionView {
    #private;
    constructor(driver: GmailDriver, groupOrderHint: number, isSearch: boolean, isCollapsible: boolean);
    destroy(): void;
    getElement(): HTMLElement;
    get eventStream(): Bus<ViewEvent, unknown>;
    setCollapsibleSectionDescriptorProperty(collapsibleSectionDescriptorProperty: Kefir.Observable<SectionDescriptor | null | undefined, unknown>): void;
    setCollapsed(value: boolean): void;
}
export default GmailCollapsibleSectionView;
//# sourceMappingURL=gmail-collapsible-section-view.d.ts.map