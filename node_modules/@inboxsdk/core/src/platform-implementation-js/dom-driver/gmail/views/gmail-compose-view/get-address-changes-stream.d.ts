import * as Kefir from 'kefir';
import type GmailComposeView from '../gmail-compose-view';
import { Contact } from '../../../../../inboxsdk';
export type AddressChangeEventName = `${'to' | 'cc' | 'bcc'}Contact${'Added' | 'Removed'}` | 'fromContactChanged';
export default function getAddressChangesStream(gmailComposeView: GmailComposeView): Kefir.Stream<never, never> | Kefir.Observable<{
    eventName: 'recipientsChanged';
    data: RecipientsChangedEvent;
} | {
    eventName: AddressChangeEventName;
    data: {
        contact: Contact;
    };
}, unknown>;
export type RecipientsChangedEvent = Record<'to' | 'cc' | 'bcc', {
    added: Contact[];
    removed: Contact[];
}>;
//# sourceMappingURL=get-address-changes-stream.d.ts.map