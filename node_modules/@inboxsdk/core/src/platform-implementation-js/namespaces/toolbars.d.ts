import { type Observable } from 'kefir';
import EventEmitter from '../lib/safe-event-emitter';
import type { Driver } from '../driver-interfaces/driver';
import type { PiOpts } from '../platform-implementation';
import type Membrane from '../lib/Membrane';
import AppToolbarButtonView from '../views/app-toolbar-button-view';
import type { AppToolbarButtonDescriptor, DropdownView, KeyboardShortcutHandle, RouteView, ThreadRowView, ThreadView } from '../../inboxsdk';
export interface LegacyToolbarButtonOnClickEvent {
    threadView: ThreadView;
    dropdown?: DropdownView;
}
export interface LegacyToolbarButtonDescriptor {
    title: string;
    iconUrl?: string;
    iconClass?: string;
    section: 'INBOX_STATE' | 'METADATA_STATE' | 'OTHER';
    onClick(event: LegacyToolbarButtonOnClickEvent): void;
    hasDropdown?: boolean;
    hideFor?: (routeView: RouteView) => boolean;
    keyboardShortcutHandle?: KeyboardShortcutHandle;
    orderHint?: number;
}
export interface LegacyListToolbarButtonOnClickEvent {
    selectedThreadRowViews: Array<ThreadRowView>;
    /** @deprecated use {@link selectedThreadRowViews} instead */
    threadRowViews: Array<ThreadRowView>;
    dropdown?: DropdownView;
}
export interface LegacyListToolbarButtonDescriptor extends Omit<LegacyToolbarButtonDescriptor, 'onClick'> {
    onClick(event: LegacyListToolbarButtonOnClickEvent): void;
}
export interface ToolbarButtonOnClickEvent {
    position: 'THREAD' | 'ROW' | 'LIST';
    selectedThreadViews: Array<ThreadView>;
    selectedThreadRowViews: Array<ThreadRowView>;
    dropdown?: DropdownView;
}
export interface ToolbarButtonDescriptor {
    title: string;
    iconUrl?: string;
    iconClass?: string;
    positions?: Array<'THREAD' | 'ROW' | 'LIST'> | null;
    threadSection?: string;
    listSection?: string;
    onClick(event: ToolbarButtonOnClickEvent): void;
    hasDropdown?: boolean;
    hideFor?: (routeView: RouteView) => boolean;
    keyboardShortcutHandle?: KeyboardShortcutHandle;
    orderHint?: number;
}
export default class Toolbars extends EventEmitter {
    #private;
    SectionNames: Readonly<{
        readonly INBOX_STATE: "INBOX_STATE";
        readonly METADATA_STATE: "METADATA_STATE";
        readonly OTHER: "OTHER";
    }>;
    constructor(appId: string, driver: Driver, membrane: Membrane, piOpts: PiOpts);
    /**
     * Registers a toolbar button to appear on thread rows, above the thread list when some rows are checked, and above threads.
     *
     * @returns a function which removes the button registration.
     */
    registerThreadButton(buttonDescriptor: ToolbarButtonDescriptor): () => void;
    /**
     * @deprecated This method is deprecated in favor of {@link Toolbars.registerThreadButton}.
     *
     * Registers a toolbar button to appear above any list page such as the Inbox or Sent Mail.
     */
    registerToolbarButtonForList(buttonDescriptor: LegacyListToolbarButtonDescriptor): () => void;
    /**
     * @deprecated This function is deprecated in favor of {@link Toolbars#registerThreadButton}.
     *
     * Registers a toolbar button to appear when viewing a thread.
     */
    registerToolbarButtonForThreadView(buttonDescriptor: LegacyToolbarButtonDescriptor): () => void;
    /** @deprecated */
    setAppToolbarButton(appToolbarButtonDescriptor: AppToolbarButtonDescriptor | Observable<AppToolbarButtonDescriptor, any>): AppToolbarButtonView;
    /**
     * Adds a button and dropdown to the "Global Toolbar". This is typically used to show a dropdown with general information about your application. In Gmail, this refers to the navigation area at the top right of the window.
     */
    addToolbarButtonForApp(buttonDescriptor: AppToolbarButtonDescriptor | Observable<AppToolbarButtonDescriptor, any>): AppToolbarButtonView;
}
//# sourceMappingURL=toolbars.d.ts.map