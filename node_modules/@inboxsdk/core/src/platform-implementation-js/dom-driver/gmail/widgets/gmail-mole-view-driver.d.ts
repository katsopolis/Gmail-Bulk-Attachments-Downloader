import type GmailDriver from '../gmail-driver';
export type MoleButtonDescriptor = {
    title: string;
    iconUrl?: string;
    iconClass?: string;
    onClick: (...args: Array<any>) => any;
};
export type MoleOptions = {
    el: HTMLElement;
    className?: string;
    title?: string;
    titleEl?: HTMLElement;
    minimizedTitleEl?: HTMLElement;
    titleButtons?: MoleButtonDescriptor[];
    chrome?: boolean;
};
declare class GmailMoleViewDriver {
    #private;
    constructor(driver: GmailDriver, options: MoleOptions);
    show(): void;
    setMinimized(minimized: boolean): void;
    getMinimized(): boolean;
    setTitle(text: string): void;
    getEventStream(): import("kefir-bus").Bus<{
        eventName: "minimize" | "restore";
    }, unknown>;
    destroy(): void;
}
export default GmailMoleViewDriver;
//# sourceMappingURL=gmail-mole-view-driver.d.ts.map