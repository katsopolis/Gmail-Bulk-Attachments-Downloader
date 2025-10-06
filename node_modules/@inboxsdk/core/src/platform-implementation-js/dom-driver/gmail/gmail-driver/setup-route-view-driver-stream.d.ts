import { Observable } from 'kefir';
import type GmailDriver from '../gmail-driver';
import type GmailRouteProcessor from '../views/gmail-route-view/gmail-route-processor';
import GmailRouteView from '../views/gmail-route-view/gmail-route-view';
export default function setupRouteViewDriverStream(gmailRouteProcessor: GmailRouteProcessor, driver: GmailDriver): Observable<GmailRouteView, unknown>;
//# sourceMappingURL=setup-route-view-driver-stream.d.ts.map