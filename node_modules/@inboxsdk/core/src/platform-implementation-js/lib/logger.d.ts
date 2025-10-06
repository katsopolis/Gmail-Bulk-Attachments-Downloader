import type { PiOpts } from '../platform-implementation';
export interface AppLogger {
    error(err: Error | unknown, details?: any): void;
    event(name: string, details?: any): void;
}
export default class Logger {
    #private;
    constructor(appId: string, opts: PiOpts, loaderVersion: string, implVersion: string);
    setUserEmailAddress(email: string): void;
    shouldTrackEverything(): boolean;
    static run<T>(cb: () => T, details?: any): T;
    run<T>(cb: () => T, details?: any): T;
    static error(err: Error | unknown, details?: any): void;
    error(err: Error | unknown, details?: any): void;
    errorApp(err: Error | unknown, details?: any): void;
    /** Only the first logger instance reports Site errors. */
    errorSite(err: Error | unknown, details?: any): void;
    /** Should only be used by the InboxSDK users for their own app events. */
    eventApp(name: string, details?: any): void;
    /**
     * For tracking app events that are possibly triggered by the user. Extensions
     * can opt out of this with a flag passed to InboxSDK.load().
     */
    eventSdkActive(name: string, details?: any): void;
    eventSdkPassive(name: string, details?: any, sensitive?: boolean): void;
    eventSite(name: string, details?: any): void;
    deprecationWarning(name: string, suggestion?: string): void;
    getAppLogger(): AppLogger;
    trackFunctionPerformance(fn: Function, sampleRate: number, details: {
        type: string;
        [key: string]: any;
    }): void;
}
export declare function hashEmail(str: string): string;
//# sourceMappingURL=logger.d.ts.map