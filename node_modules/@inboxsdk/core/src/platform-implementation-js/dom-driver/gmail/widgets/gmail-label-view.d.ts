declare class GmailLabelView {
    _element: HTMLElement;
    _labelDescriptor: Record<string, any>;
    _iconSettings: Record<string, any>;
    constructor(opts?: {
        classes?: string[] | null | undefined;
    });
    getElement(): HTMLElement;
    updateLabelDescriptor(labelDescriptor: Record<string, any> | null | undefined): void;
    _handleNewLabelDescriptor(labelDescriptor: Record<string, any> | null | undefined): void;
    _updateTextMaxWidth(maxWidth: string): void;
    _updateBackgroundColor(backgroundColor: string): void;
    _updateForegroundColor(foregroundColor: string): void;
    _updateIconBackgroundColor(iconBackgroundColor: string | null | undefined): void;
    _updateTitle(title: string, titleHtml?: string): void;
}
export default GmailLabelView;
//# sourceMappingURL=gmail-label-view.d.ts.map