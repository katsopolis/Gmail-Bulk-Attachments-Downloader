import { ComposeRequest } from './constants';
export declare function parseComposeRequestBody(request: string): ComposeRequest | null;
export declare function parseComposeResponseBody(response: string): {
    threadId: string;
    messageId: string;
    to: import("../../inboxsdk").Contact[] | null;
    cc: import("../../inboxsdk").Contact[] | null;
    bcc: import("../../inboxsdk").Contact[] | null;
    actions: string[];
    rfcID: any;
    oldMessageId: any;
    oldThreadId: any;
    type: import("./constants").ComposeRequestType;
}[];
export declare function replaceBodyContentInComposeSendRequestBody(request: string, newBodyHtmlContent: string): string;
//# sourceMappingURL=sync-compose-processor.d.ts.map