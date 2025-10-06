import type { Driver } from '../driver-interfaces/driver';
import type { PiOpts } from '../platform-implementation';
export interface PersonDetails {
    fullName?: string;
    fullNameSortOrder?: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
}
export default class User {
    #private;
    constructor(driver: Driver, piOpts: PiOpts);
    getEmailAddress(): string;
    isConversationViewDisabled(): Promise<boolean>;
    /** @deprecated */
    isUsingGmailMaterialUI(): boolean;
    getLanguage(): string;
    /** @deprecated use {@link User.getEmailAddress} instead */
    getUserContact(): import("../../inboxsdk").Contact;
    /** @deprecated use {@link User.getEmailAddress} instead */
    getAccountSwitcherContactList(): import("../../inboxsdk").Contact[];
    getPersonDetails(emailAddress: string): Promise<PersonDetails | undefined>;
}
//# sourceMappingURL=user.d.ts.map