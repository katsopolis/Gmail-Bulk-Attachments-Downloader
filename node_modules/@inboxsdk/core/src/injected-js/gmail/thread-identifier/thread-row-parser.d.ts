export type ThreadRowMetadata = {
    timeString: string;
    subject: string;
    peopleHtml: string;
};
/**
 * Ads in the Promotions tab aren't included with other thread row data.
 */
export declare const ThreadRowAd: unique symbol;
export declare function extractMetadataFromThreadRow(threadRow: HTMLElement): ThreadRowMetadata | typeof ThreadRowAd;
//# sourceMappingURL=thread-row-parser.d.ts.map