import * as Kefir from 'kefir';
import type { Driver } from '../../driver-interfaces/driver';
export interface ContentPanelDescriptor {
    appIconUrl?: string;
    appName?: string;
    el: HTMLElement;
    id?: string;
    hideTitleBar?: boolean;
    iconClass?: string;
    iconLiga?: string;
    iconUrl?: string;
    orderHint?: number;
    primaryColor?: string;
    secondaryColor?: string;
    title?: string;
}
export interface SidebarPanelEvent {
    appIconUrl?: string;
    appId: string;
    appName: string;
    hideTitleBar: boolean;
    iconLiga?: string;
    iconClass?: string;
    iconUrl?: string;
    id: string;
    instanceId: string;
    isGlobal?: boolean;
    orderHint: number;
    primaryColor?: string;
    secondaryColor?: string;
    sidebarId: string;
    title?: string;
}
declare class ContentPanelViewDriver {
    #private;
    constructor(driver: Driver, descriptor: Kefir.Observable<ContentPanelDescriptor, unknown>, sidebarId: string, isGlobal?: boolean);
    getStopper(): Kefir.Observable<null, unknown>;
    getEventStream(): import("kefir-bus").Bus<{
        eventName: "activate" | "deactivate";
    }, unknown>;
    scrollIntoView(): void;
    close(): void;
    open(): void;
    isActive(): boolean;
    remove(): void;
}
export default ContentPanelViewDriver;
//# sourceMappingURL=ContentPanelViewDriver.d.ts.map