interface Recipient {
    emailAddress: string;
    name?: string;
}
export interface SyncThread {
    subject: string;
    snippet: string;
    syncThreadID: string;
    oldGmailThreadID: string;
    rawResponse: any;
    extraMetaData: {
        snippet: string;
        syncMessageData: Array<{
            syncMessageID: string;
            oldMessageID?: string;
            date: number;
            recipients?: Recipient[];
        }>;
    };
}
export interface MinimalSyncThread {
    syncThreadID: string;
    extraMetaData: {
        syncMessageData: Array<{
            syncMessageID: string;
            date: number;
            recipients?: Recipient[];
        }>;
    };
}
export declare function extractThreadsFromSearchResponse(response: string): SyncThread[];
export declare function extractThreadsFromSearchResponse_20220909(parsedResponse: any[]): SyncThread[];
export declare function extractThreadsFromThreadResponse(response: string): Array<SyncThread | MinimalSyncThread>;
export declare function replaceThreadsInSearchResponse(response: string, replacementThreads: SyncThread[], _unused: {
    start: number;
    total?: number | 'MANY';
}): string;
export declare function replaceThreadsInSearchResponse_20220909(parsedResponse: any[], replacementThreads: SyncThread[], _unused: {
    start: number;
    total?: number | 'MANY';
}): string;
export {};
//# sourceMappingURL=gmail-sync-response-processor.d.ts.map