import type * as Kefir from 'kefir';
import GmailAppToolbarButtonView from '../views/gmail-app-toolbar-button-view';
import type GmailDriver from '../gmail-driver';
import { AppToolbarButtonDescriptor } from '../../../../inboxsdk';
export default function addToolbarButtonForApp(gmailDriver: GmailDriver, buttonDescriptor: Kefir.Observable<AppToolbarButtonDescriptor, any>): Promise<GmailAppToolbarButtonView>;
//# sourceMappingURL=add-toolbar-button-for-app.d.ts.map