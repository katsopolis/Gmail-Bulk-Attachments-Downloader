import * as Kefir from 'kefir';
import GmailComposeView from '../views/gmail-compose-view';
import type GmailMessageView from '../views/gmail-message-view';
import type GmailDriver from '../gmail-driver';
export default function setupComposeViewDriverStream(gmailDriver: GmailDriver, messageViewDriverStream: Kefir.Observable<GmailMessageView, unknown>, xhrInterceptorStream: Kefir.Observable<any, unknown>): Kefir.Observable<GmailComposeView, unknown>;
//# sourceMappingURL=setup-compose-view-driver-stream.d.ts.map