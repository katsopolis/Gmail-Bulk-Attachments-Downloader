import { Driver } from '../driver-interfaces/driver';
type Options = {
    oldGmailMessageID: string;
    syncMessageID?: void;
} | {
    syncMessageID: string;
    oldGmailMessageID?: void;
};
declare function getOriginalMessagePage(driver: Driver, options: Options): Promise<string>;
declare const _default: typeof getOriginalMessagePage;
export default _default;
//# sourceMappingURL=getOriginalMessagePage.d.ts.map