import type GmailDriver from '../gmail-driver';
import type { SyncThread } from '../gmail-sync-response-processor';
export default function getThreadFromSyncThreadId(driver: GmailDriver, syncThreadId: string): Promise<SyncThread | null | undefined>;
export declare function getThreadFromSyncThreadIdUsingHeaders(syncThreadId: string, btaiHeader: string, xsrfToken: string): Promise<SyncThread | null | undefined>;
//# sourceMappingURL=getSyncThreadFromSyncThreadId.d.ts.map