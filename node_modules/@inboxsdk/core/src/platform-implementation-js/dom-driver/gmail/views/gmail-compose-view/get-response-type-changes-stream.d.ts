import * as Kefir from 'kefir';
import type GmailComposeView from '../gmail-compose-view';
export default function (gmailComposeView: GmailComposeView): Kefir.Observable<{
    data: {
        isForward: boolean;
    };
    eventName: "responseTypeChanged";
}, never>;
//# sourceMappingURL=get-response-type-changes-stream.d.ts.map