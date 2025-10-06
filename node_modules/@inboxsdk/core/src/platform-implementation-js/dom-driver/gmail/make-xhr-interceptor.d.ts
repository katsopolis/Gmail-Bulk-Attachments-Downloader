import * as Kefir from 'kefir';
import PageCommunicator from './gmail-page-communicator';
export default function makeXhrInterceptor(): {
    xhrInterceptStream: Kefir.Observable<Object, unknown>;
    pageCommunicatorPromise: Promise<PageCommunicator>;
};
//# sourceMappingURL=make-xhr-interceptor.d.ts.map