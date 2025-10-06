import type GmailDriver from '../../../gmail-driver';
/** Only one instance of this Primary is ever created within a page, even if
 * there are multiple InboxSDK instances and/or extensions. All other InboxSDK
 * instances (including from other extensions) communicate with this Primary
 * through DOM events. */
declare class GmailAppSidebarPrimary {
    #private;
    constructor(driver: GmailDriver, companionSidebarContentContainerElement: HTMLElement);
    getInstanceId(): string;
    /**
     * Only use this if a different Primary needs to take over this one's elements.
     * Currently this is only done when hot-reloading in dev. Don't use this when
     * a threadview exits, the sdk.destroy() is called, etc.
     */
    destroy(): void;
}
export default GmailAppSidebarPrimary;
//# sourceMappingURL=index.d.ts.map