import type GmailDriver from '../gmail-driver';
export type GetDraftIdResult = {
    draftID: string | undefined | null;
    debugData: any;
};
declare function getDraftIDForMessageID(driver: GmailDriver, messageID: string, skipCache?: boolean): Promise<GetDraftIdResult>;
declare const _default: typeof getDraftIDForMessageID;
export default _default;
//# sourceMappingURL=get-draft-id-for-message-id.d.ts.map