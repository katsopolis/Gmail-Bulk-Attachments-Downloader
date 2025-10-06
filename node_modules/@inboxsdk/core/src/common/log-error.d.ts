export interface LogErrorContext {
    appId?: string;
    appIds?: any[];
    sentByApp?: boolean;
    loaderVersion?: string;
    implVersion?: string;
    userEmailHash?: string;
}
export default function logError(err: Error | unknown, details: any, context: LogErrorContext): void;
//# sourceMappingURL=log-error.d.ts.map