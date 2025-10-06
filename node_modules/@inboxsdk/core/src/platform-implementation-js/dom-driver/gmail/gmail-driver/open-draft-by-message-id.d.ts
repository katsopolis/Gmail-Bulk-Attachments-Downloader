import GmailDriver from '../gmail-driver';
export default function openDraftByMessageID(driver: GmailDriver, messageID: string): Promise<void>;
export declare function makeNewHash(oldHash: string, messageID: string): string;
export declare function makeNewSyncHash(oldHash: string, syncThreadID: string, syncMessageID: string): string;
//# sourceMappingURL=open-draft-by-message-id.d.ts.map