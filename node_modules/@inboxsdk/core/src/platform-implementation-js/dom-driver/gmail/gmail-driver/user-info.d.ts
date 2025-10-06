import { Driver } from '../../../driver-interfaces/driver';
import { Contact } from '../../../../inboxsdk';
export default class UserInfo {
    #private;
    constructor(driver: Driver);
    /** @deprecated */
    getUserName(): string;
    /** @deprecated */
    getAccountSwitcherContactList(): Contact[];
}
//# sourceMappingURL=user-info.d.ts.map