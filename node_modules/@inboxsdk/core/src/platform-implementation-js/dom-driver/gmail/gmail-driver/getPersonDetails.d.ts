import type { PersonDetails } from '../../../namespaces/user';
import type GmailDriver from '../gmail-driver';
export default function getPersonDetails(driver: GmailDriver, emailAddress: string): Promise<PersonDetails | undefined>;
export declare function parseListPeopleByKnownIdResponse(data: any): PersonDetails | undefined;
//# sourceMappingURL=getPersonDetails.d.ts.map