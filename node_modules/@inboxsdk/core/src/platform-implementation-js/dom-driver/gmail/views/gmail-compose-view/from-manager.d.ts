import type GmailDriver from '../../gmail-driver';
import type GmailComposeView from '../../views/gmail-compose-view';
import { Contact } from '../../../../../inboxsdk';
export declare function getFromContact(driver: GmailDriver, gmailComposeView: GmailComposeView): Contact;
export declare function getFromContactChoices(driver: GmailDriver, gmailComposeView: GmailComposeView): Contact[];
export declare function setFromEmail(driver: GmailDriver, gmailComposeView: GmailComposeView, email: string): void;
//# sourceMappingURL=from-manager.d.ts.map