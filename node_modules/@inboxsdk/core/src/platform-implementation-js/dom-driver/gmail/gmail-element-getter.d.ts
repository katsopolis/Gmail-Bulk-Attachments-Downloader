import * as Kefir from 'kefir';
import { ElementWithLifetime } from '../../lib/dom/make-element-child-stream';
declare const GmailElementGetter: {
    getActiveMoreMenu(): HTMLElement | null;
    getAddonSidebarContainerElement(): HTMLElement | null;
    getCompanionSidebarContentContainerElement(): HTMLElement | null;
    getCompanionSidebarIconContainerElement(): HTMLElement | null;
    getComposeButton(): HTMLElement | null;
    getComposeWindowContainer(): HTMLElement | null;
    getContentSectionElement(): HTMLElement | undefined | null;
    getFullscreenComposeWindowContainer(): HTMLElement | null;
    getFullscreenComposeWindowContainerStream(): Kefir.Observable<ElementWithLifetime, never>;
    getGtalkButtons(): HTMLElement | null;
    getLeftNavContainerElement(): HTMLElement | null;
    getLeftNavHeightElement(): HTMLElement | null;
    getMainContentBodyContainerElement(): HTMLElement | null;
    getMainContentContainer(): HTMLElement | null;
    getMainContentElementChangedStream: (this: any) => Kefir.Observable<HTMLElement, never>;
    /**
     * This method checks whether we should use the old InboxSDK style of adding nav items
     * inline among Gmail's nav items (as opposed to the newer style where we put our nav items
     * in their own sections at the bottom of the leftnav).
     */
    shouldAddNavItemsInline(): boolean;
    getAppMenuAsync: () => Promise<HTMLElement | undefined>;
    getAppBurgerMenu(): HTMLElement | null;
    isAppBurgerMenuOpen(): boolean;
    getAppMenuContainer(): HTMLElement | null;
    getAppMenu(): HTMLElement | null;
    getAppHeader(): HTMLElement | null;
    getSeparateSectionNavItemMenuInjectionContainer(): HTMLElement | null;
    getSameSectionNavItemMenuInjectionContainer(): HTMLElement | null;
    getRowListElementsContainer(): HTMLElement | null;
    getRowListElements(): HTMLElement[] | null;
    getScrollContainer(): HTMLElement | null;
    getSearchInput(): HTMLInputElement | null;
    getSearchSuggestionsBoxParent(): HTMLElement | null;
    getSidebarContainerElement(): HTMLElement | null;
    getThreadBackButton(): HTMLElement | null;
    getThreadContainerElement(): HTMLElement | null;
    getPreviewPaneContainerElement(): HTMLElement | null;
    getToolbarElement(): HTMLElement;
    getTopAccountContainer(): HTMLElement | null;
    isGplusEnabled(): boolean;
    /** @deprecated this doesn't include Gmail themes where the frame is dark and the body is not. Use Global.gmailTheme instead */
    isDarkTheme(): boolean;
    isPreviewPane(): boolean;
    isStandalone(): boolean;
    isStandaloneComposeWindow(): boolean;
    isStandaloneThreadWindow(): boolean;
    StandaloneCompose: {
        getComposeWindowContainer(): HTMLElement | null;
    };
    waitForGmailModeToSettle(): Promise<void>;
};
export default GmailElementGetter;
//# sourceMappingURL=gmail-element-getter.d.ts.map