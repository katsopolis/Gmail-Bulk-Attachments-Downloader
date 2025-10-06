import SafeEventEmitter from './lib/safe-event-emitter';
import ButterBar from './namespaces/butter-bar';
import Compose from './namespaces/compose';
import Conversations from './namespaces/conversations';
import Keyboard from './namespaces/keyboard';
import Widgets from './namespaces/widgets';
import Modal from './namespaces/modal';
import Lists from './namespaces/lists';
import NavMenu from './namespaces/nav-menu';
import AppMenu from './namespaces/app-menu';
import Router from './namespaces/router';
import Search from './namespaces/search';
import Toolbars from './namespaces/toolbars';
import User from './namespaces/user';
import Global from './namespaces/global';
import GmailDriver from './dom-driver/gmail/gmail-driver';
import type { AppLogger } from './lib/logger';
export type PiOpts = {
    appName?: string | null;
    appIconUrl?: string | null;
    /**
     * @deprecated Is this used?
     */
    appVersion?: string;
    suppressAddonTitle?: string | null;
    VERSION: string;
    globalErrorLogging: boolean;
    eventTracking: boolean;
    REQUESTED_API_VERSION: number;
    primaryColor?: string;
    secondaryColor?: string;
};
export declare class PlatformImplementation extends SafeEventEmitter {
    #private;
    destroyed: boolean;
    LOADER_VERSION: string;
    IMPL_VERSION: string;
    Compose: Compose;
    Conversations: Conversations;
    Keyboard: Keyboard;
    User: User;
    Lists: Lists;
    NavMenu: NavMenu;
    AppMenu: AppMenu;
    Router: Router;
    Search: Search;
    Toolbars: Toolbars;
    ButterBar: ButterBar;
    Widgets: Widgets;
    Global: Global;
    /**
     * @deprecated
     */
    Modal: Modal | null | undefined;
    Logger: AppLogger;
    constructor(driver: GmailDriver, appId: string, piOpts: PiOpts);
    destroy(): void;
}
export type EnvData = {
    piMainStarted: number;
    piLoadStarted: number;
    wasAccountSwitcherReadyAtStart: boolean;
};
export declare function makePlatformImplementation(appId: string, _opts: Partial<PiOpts>, envData: EnvData): Promise<PlatformImplementation>;
//# sourceMappingURL=platform-implementation.d.ts.map