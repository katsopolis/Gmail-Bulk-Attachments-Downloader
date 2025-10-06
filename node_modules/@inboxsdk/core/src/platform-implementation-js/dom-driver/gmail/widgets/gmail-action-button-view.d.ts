declare class GmailActionButtonView {
    _element: HTMLElement;
    _actionDescriptor: Record<string, any> | null | undefined;
    constructor();
    getElement(): HTMLElement;
    updateDescriptor(actionButtonDescriptor: Record<string, any> | null | undefined): void;
    setOnClick(callback: ((event: MouseEvent) => void) | null | undefined): void;
    _updateTitle(title: string): void;
}
export default GmailActionButtonView;
//# sourceMappingURL=gmail-action-button-view.d.ts.map