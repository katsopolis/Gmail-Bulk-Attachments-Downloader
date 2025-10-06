import { ComposeRequestType } from './constants';
import { Contact } from '../../inboxsdk';
export declare function parseComposeRequestBody_2022_09_09(request: Array<any>): {
    threadId: string;
    messageId: string;
    to: Contact[] | null;
    cc: Contact[] | null;
    bcc: Contact[] | null;
    subject: any;
    body: any;
    actions: any;
    type: "FIRST_DRAFT_SAVE" | "DRAFT_SAVE" | "SEND";
} | null;
export declare function parseComposeResponseBody_2022_09_09(response: Array<any>): {
    threadId: string;
    messageId: string;
    to: Contact[] | null;
    cc: Contact[] | null;
    bcc: Contact[] | null;
    actions: string[];
    rfcID: any;
    oldMessageId: any;
    oldThreadId: any;
    type: ComposeRequestType;
}[];
export declare function replaceBodyContentInComposeSendRequestBody_2022_09_09(request: Array<any>, newBodyHtmlContent: string): Array<any> | null;
export declare function actionsToComposeRequestType(actions: string[]): ComposeRequestType | null;
//# sourceMappingURL=sync-compose-processor-20220909.d.ts.map