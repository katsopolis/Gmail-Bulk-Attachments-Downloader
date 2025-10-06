import * as Kefir from 'kefir';
export default class GmailButterBarDriver {
    constructor();
    getNoticeAvailableStream(): Kefir.Observable<any, unknown>;
    getSharedMessageQueue(): Array<any>;
    setSharedMessageQueue(queue: any): void;
    showMessage(rawOptions: any): {
        destroy(): void;
    };
    hideGmailMessage(): void;
}
//# sourceMappingURL=gmail-butter-bar-driver.d.ts.map