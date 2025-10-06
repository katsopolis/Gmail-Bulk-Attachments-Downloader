import { Observable } from 'kefir';
import ContentPanelView from '../views/content-panel-view';
import type { Driver } from '../driver-interfaces/driver';
import GmailSupportItemView from '../dom-driver/gmail/views/gmail-support-item-view';
import type { SupportItemDescriptor } from '../dom-driver/gmail/views/gmail-support-item-view';
import { type ContentPanelDescriptor } from '../driver-common/sidebar/ContentPanelViewDriver';
export default class Global {
    #private;
    constructor(appId: string, driver: Driver);
    get gmailTheme(): {
        isDarkMode: {
            frame: boolean;
            body: boolean;
        };
    };
    addSidebarContentPanel(descriptor: ContentPanelDescriptor | Observable<ContentPanelDescriptor, unknown>): Promise<ContentPanelView | null>;
    addSupportItem(supportItemDescriptor: SupportItemDescriptor): GmailSupportItemView;
}
//# sourceMappingURL=global.d.ts.map