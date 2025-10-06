import GmailDriver from '../gmail-driver';
export interface SupportItemDescriptor {
    element: HTMLElement;
    onClick: () => void;
}
export default class GmailSupportItemView {
    _stopper: import("kefir-stopper").Stopper;
    _driver: GmailDriver;
    _insertElementContainer: HTMLElement | null;
    constructor(driver: GmailDriver, supportItemDescriptor: SupportItemDescriptor);
    destroy(): void;
    _setup(supportItemDescriptor: SupportItemDescriptor): void;
    _addSupportElement(supportElement: HTMLElement, supportItemDescriptor: SupportItemDescriptor): void;
    _closeSupportMenu(supportElement: HTMLElement): void;
}
//# sourceMappingURL=gmail-support-item-view.d.ts.map