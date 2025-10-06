import { Driver } from '../driver-interfaces/driver';
import { SyncThread } from '../dom-driver/gmail/gmail-sync-response-processor';
declare function getSyncThreadsForSearch(driver: Driver, searchTerm: string): Promise<{
    threads: SyncThread[];
    _text: string;
}>;
declare const _default: typeof getSyncThreadsForSearch;
export default _default;
//# sourceMappingURL=getSyncThreadsForSearch.d.ts.map