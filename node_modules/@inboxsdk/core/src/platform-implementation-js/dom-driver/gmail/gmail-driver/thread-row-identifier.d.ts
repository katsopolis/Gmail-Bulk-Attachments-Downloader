import type GmailDriver from '../gmail-driver';
import type GmailComposeView from '../views/gmail-compose-view';
import type GmailThreadRowView from '../views/gmail-thread-row-view';
declare class ThreadRowIdentifier {
    _driver: GmailDriver;
    _composeViews: Set<GmailComposeView>;
    constructor(driver: GmailDriver);
    getThreadIdForThreadRow(gmailThreadRowView: GmailThreadRowView, elements: HTMLElement[]): string | null | undefined;
    getDraftIdForThreadRow(gmailThreadRowView: GmailThreadRowView): Promise<string | null | undefined>;
    _findComposeForThreadRow(gmailThreadRowView: GmailThreadRowView): GmailComposeView | null | undefined;
}
export default ThreadRowIdentifier;
//# sourceMappingURL=thread-row-identifier.d.ts.map