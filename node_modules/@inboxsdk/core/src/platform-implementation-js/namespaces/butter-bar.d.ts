import { Driver, ButterBarMessage } from '../driver-interfaces/driver';
export default class ButterBar {
    constructor(appId: string, driver: Driver);
    showMessage(options: any): ButterBarMessage;
    showLoading(options?: any): ButterBarMessage;
    showError(options: any): ButterBarMessage;
    showSaving(options?: any): any;
    hideMessage(messageKey: any | string): void;
    hideGmailMessage(): void;
}
//# sourceMappingURL=butter-bar.d.ts.map