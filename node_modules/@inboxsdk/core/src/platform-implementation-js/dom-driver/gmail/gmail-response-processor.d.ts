export declare function extractGmailThreadIdFromMessageIdSearch(responseString: string): string | null;
export declare function rewriteSingleQuotes(s: string): string;
export interface MessageOptions {
    includeLengths: boolean;
    suggestionMode: boolean;
    noArrayNewLines: boolean;
    includeExplicitNulls: boolean;
}
export declare function deserialize(threadResponseString: string): {
    value: any[];
    options: MessageOptions;
};
export declare function deserializeArray(value: string): any[];
export declare function serialize(value: any[], options: MessageOptions): string;
export interface Thread {
    subject: string;
    shortDate: string;
    timeString: string;
    peopleHtml: string;
    timestamp: number;
    isUnread: boolean;
    lastEmailAddress: string | null | undefined;
    bodyPreviewHtml: string;
    someGmailMessageIds: string[];
    gmailThreadId: string;
}
export declare function readDraftId(response: string, messageID: string): string | null;
export declare function replaceThreadsInResponse(response: string, replacementThreads: Thread[], { start, total }: {
    start: number;
    total?: number | 'MANY';
}): string;
export declare function extractThreads(response: string): Thread[];
export declare function extractThreadsFromDeserialized(value: any[]): Thread[];
export declare function extractMessageIdsFromThreadBatchRequest(response: string): {
    [threadId: string]: string;
};
export declare function cleanupPeopleLine(peopleHtml: string): string;
export interface Message {
    date: number;
    messageID?: string;
    recipients?: Array<{
        emailAddress: string;
        name: string | null | undefined;
    }>;
}
export declare function extractMessages(response: string): Array<{
    threadID: string;
    messages: Message[];
}>;
//# sourceMappingURL=gmail-response-processor.d.ts.map