import * as Kefir from 'kefir';
import type { TagTree } from 'tag-tree';
import GmailBackdrop from './views/gmail-backdrop';
import type GmailThreadRowView from './views/gmail-thread-row-view';
import type GmailAppToolbarButtonView from './views/gmail-app-toolbar-button-view';
import GmailTopMessageBarDriver from './widgets/gmail-top-message-bar-driver';
import GmailModalViewDriver from './widgets/gmail-modal-view-driver';
import GmailMoleViewDriver, { type MoleOptions } from './widgets/gmail-mole-view-driver';
import InboxDrawerView from '../inbox/views/inbox-drawer-view';
import KeyboardShortcutHelpModifier from './gmail-driver/keyboard-shortcut-help-modifier';
import GmailButterBarDriver from './gmail-butter-bar-driver';
import type KeyboardShortcutHandle from '../../views/keyboard-shortcut-handle';
import type { GetDraftIdResult } from './gmail-driver/get-draft-id-for-message-id';
import ThreadRowIdentifier from './gmail-driver/thread-row-identifier';
import GmailAppSidebarView from './views/gmail-app-sidebar-view';
import type Logger from '../../lib/logger';
import type PageCommunicator from './gmail-page-communicator';
import type { RouteParams } from '../../namespaces/router';
import type ButterBar from '../../namespaces/butter-bar';
import type { DrawerViewOptions } from '../../driver-interfaces/driver';
import type GmailComposeView from './views/gmail-compose-view';
import type GmailMessageView from './views/gmail-message-view';
import type GmailThreadView from './views/gmail-thread-view';
import type GmailRouteView from './views/gmail-route-view/gmail-route-view';
import type GmailSupportItemView from './views/gmail-support-item-view';
import type { SupportItemDescriptor } from './views/gmail-support-item-view';
import type { PiOpts, EnvData } from '../../platform-implementation';
import type NativeGmailNavItemView from './views/native-gmail-nav-item-view';
import type { AppMenuItemDescriptor } from '../../namespaces/app-menu';
import type ContentPanelViewDriver from '../../driver-common/sidebar/ContentPanelViewDriver';
import GmailNavItemView, { type NavItemDescriptor } from './views/gmail-nav-item-view';
import { AppToolbarButtonDescriptor, Contact, DropdownView, ToolbarButtonDescriptor } from '../../../inboxsdk';
import GmailAttachmentCardView from './views/gmail-attachment-card-view';
import type { PersonDetails } from '../../namespaces/user';
import { type ContentPanelDescriptor } from '../../driver-common/sidebar/ContentPanelViewDriver';
import type { SearchSuggestionsProvider, SearchQueryRewriter } from '../../namespaces/search';
/**
 * @internal
 */
declare class GmailDriver {
    #private;
    onready: Promise<void>;
    getGmailThreadIdForRfcMessageId: (rfcId: string) => Promise<string>;
    getRfcMessageIdForGmailThreadId: (threadId: string) => Promise<string>;
    getSyncThreadIdForOldGmailThreadId: (threadId: string) => Promise<string>;
    getOldGmailThreadIdFromSyncThreadId: (threadId: string) => Promise<string>;
    removeCachedOldGmailThreadIdFromSyncThreadId: (threadId: string) => void;
    getGmailMessageIdForSyncDraftId: (syncDraftId: string) => Promise<string>;
    getGmailMessageIdForSyncMessageId: (syncMessageId: string) => Promise<string>;
    removeCachedGmailMessageIdForSyncMessageId: (syncMessageID: string) => void;
    constructor(appId: string, LOADER_VERSION: string, IMPL_VERSION: string, logger: Logger, opts: PiOpts, envData: EnvData);
    destroy(): void;
    getAppId(): string;
    getOpts(): PiOpts;
    getPageCommunicator(): PageCommunicator;
    getPageCommunicatorPromise(): Promise<PageCommunicator>;
    get logger(): Logger;
    getLogger(): Logger;
    getTagTree(): TagTree<HTMLElement>;
    getCustomListSearchStringsToRouteIds(): Map<string, string>;
    getThreadRowIdentifier(): ThreadRowIdentifier;
    getButterBarDriver(): GmailButterBarDriver;
    getButterBar(): ButterBar | null | undefined;
    setButterBar(bb: ButterBar): void;
    getCustomRouteIDs(): Set<string>;
    getCustomListRouteIDs(): Map<string, Function>;
    getKeyboardShortcutHelpModifier(): KeyboardShortcutHelpModifier;
    getRouteViewDriverStream(): Kefir.Observable<GmailRouteView, unknown>;
    getThreadRowViewDriverStream(): Kefir.Observable<any, unknown>;
    getThreadViewDriverStream(): Kefir.Observable<GmailThreadView, never>;
    getAttachmentCardViewDriverStream(): Kefir.Stream<GmailAttachmentCardView, unknown>;
    getComposeViewDriverStream(): Kefir.Observable<GmailComposeView, unknown>;
    getXhrInterceptorStream(): Kefir.Observable<Object, unknown>;
    getMessageViewDriverStream(): Kefir.Observable<GmailMessageView, unknown>;
    getStopper(): Kefir.Observable<null, never>;
    getEnvData(): EnvData;
    getTimestampOnReady(): number;
    delayToTimeAfterReady(time: number): Kefir.Observable<void, unknown>;
    getTimings(): {
        readonly piMainStarted: number;
        readonly piLoadStarted: number;
        readonly globalsFound: number | null | undefined;
        readonly accountSwitcherReady: number | null | undefined;
        readonly onready: number | null | undefined;
    };
    registerThreadButton(options: Omit<ToolbarButtonDescriptor, 'hideFor' | 'onClick'> & {
        onClick(event: {
            position: 'ROW' | 'LIST' | 'THREAD';
            dropdown: DropdownView;
            selectedThreadViewDrivers: GmailThreadView[];
            selectedThreadRowViewDrivers: GmailThreadRowView[];
        }): void;
    }): () => void;
    hashChangeNoViewChange(hash: string): void;
    addCustomRouteID(routeID: string): () => void;
    addCustomListRouteID(routeID: string, handler: Function): () => void;
    signalCustomThreadListActivity(customRouteID: string): void;
    getLastCustomThreadListActivity(): {
        customRouteID: string;
        timestamp: Date;
    } | null | undefined;
    showCustomThreadList(customRouteID: string, onActivate: Function, params: Array<string>): void;
    showCustomRouteView(element: HTMLElement): void;
    showNativeRouteView(): void;
    createLink(routeID: string, params: RouteParams | string | null | undefined): string;
    goto(routeID: string, params: RouteParams | string | null | undefined): Promise<void>;
    resolveUrlRedirects(url: string): Promise<string>;
    registerSearchSuggestionsProvider(handler: SearchSuggestionsProvider): void;
    registerSearchQueryRewriter(obj: SearchQueryRewriter): void;
    addToolbarButtonForApp(buttonDescriptor: Kefir.Observable<AppToolbarButtonDescriptor, any>): Promise<GmailAppToolbarButtonView>;
    openNewComposeViewDriver(): Promise<GmailComposeView>;
    getNextComposeViewDriver(timeout?: number): Promise<GmailComposeView>;
    openDraftByMessageID(messageID: string): Promise<void>;
    createModalViewDriver(options: any): GmailModalViewDriver;
    createMoleViewDriver(options: MoleOptions): GmailMoleViewDriver;
    createDrawerViewDriver(options: DrawerViewOptions): InboxDrawerView;
    createBackdrop(zIndex?: number, target?: HTMLElement): GmailBackdrop;
    addNavItem(appId: string, navItemDescriptorPropertyStream: Kefir.Observable<NavItemDescriptor, unknown>, navMenuInjectionContainer?: HTMLElement): Promise<GmailNavItemView>;
    addNavItemToPanel(appId: string, navItemDescriptorPropertyStream: Kefir.Observable<NavItemDescriptor, unknown>, panelElement: HTMLElement): Promise<GmailNavItemView>;
    addAppMenuItem(menuItemDescriptor: AppMenuItemDescriptor): Promise<import("./views/gmail-app-menu-item-view").GmailAppMenuItemView>;
    addSupportItem(supportItemDescriptor: SupportItemDescriptor): GmailSupportItemView;
    getSentMailNativeNavItem(): Promise<NativeGmailNavItemView>;
    setShowNativeNavMarker(isNative: boolean): void;
    setShowNativeAddonSidebar(isNative: boolean): void;
    getGmailActionToken(): Promise<string>;
    getUserEmailAddress(): string;
    isConversationViewDisabled(): Promise<boolean>;
    getUserLanguage(): string;
    getUserContact(): Contact;
    getAccountSwitcherContactList(): Contact[];
    activateShortcut(keyboardShortcutHandle: KeyboardShortcutHandle, appName: string | null | undefined, appIconUrl: string | null | undefined): void;
    get gmailTheme(): {
        isDarkMode: {
            frame: boolean;
            body: boolean;
        };
    };
    /**
     * Listen for if Gmail changes its theme (dark, light, or frame dark / body light mode).
     */
    get gmailThemeStream(): Kefir.Observable<{
        frame: boolean;
        body: boolean;
    }, unknown>;
    addGlobalSidebarContentPanel(descriptor: Kefir.Observable<ContentPanelDescriptor, unknown>): Promise<ContentPanelViewDriver | null | undefined>;
    waitForGlobalSidebarReady(): Kefir.Observable<void, unknown>;
    getGlobalSidebar(): GmailAppSidebarView;
    isRunningInPageContext(): boolean;
    showAppIdWarning(): void;
    createTopMessageBarDriver(optionStream: Kefir.Observable<any, unknown>): GmailTopMessageBarDriver;
    associateThreadAndMessageIDs(threadID: string, messageID: string): void;
    getThreadIDForMessageID(messageID: string): string;
    getDraftIDForMessageID(messageID: string, skipCache?: boolean): Promise<GetDraftIdResult>;
    reportRecentSyncDraftId(syncDraftId: string): void;
    reportDraftClosed(syncDraftId: string): void;
    isRecentSyncDraftId(syncMessageId: string): boolean;
    getSelectedThreadRowViewDrivers(): ReadonlyArray<GmailThreadRowView>;
    signalThreadRowViewSelectionChange(): void;
    registerThreadRowViewSelectionHandler(handler: () => any): () => void;
    getPersonDetails(emailAddress: string): Promise<PersonDetails | undefined>;
}
export default GmailDriver;
//# sourceMappingURL=gmail-driver.d.ts.map