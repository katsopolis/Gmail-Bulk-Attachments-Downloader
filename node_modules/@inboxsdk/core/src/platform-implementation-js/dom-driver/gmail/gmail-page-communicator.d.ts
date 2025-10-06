import { AutocompleteSearchResultWithId } from '../../../injected-js/gmail/modify-suggestions';
import { type Observable } from 'kefir';
import { CommonAjaxOpts } from '../../../common/ajax';
export default class GmailPageCommunicator {
    ajaxInterceptStream: Observable<any, never>;
    constructor();
    getUserEmailAddress(): string;
    getUserLanguage(): string;
    getIkValue(): string;
    getXsrfToken(): Promise<string>;
    getBtaiHeader(): Promise<string>;
    resolveUrlRedirects(url: string): Promise<string>;
    pageAjax(opts: CommonAjaxOpts): Promise<{
        text: string;
        responseURL: string;
    }>;
    silenceGmailErrorsForAMoment(): () => void;
    registerAllowedHashLinkStartTerm(term: string): void;
    getMessageDate(threadId: string, message: HTMLElement): Promise<number | null>;
    getMessageRecipients(threadId: string, message: HTMLElement): Promise<Array<{
        emailAddress: string;
        name: string | null | undefined;
    }> | null>;
    private _getMessageData;
    getThreadIdForThreadRowByDatabase(threadRow: HTMLElement): string | null;
    getThreadIdForThreadRowByClick(threadRow: HTMLElement): string | null;
    getCurrentThreadID(threadContainerElement: HTMLElement, isPreviewedThread?: boolean): string;
    getUserOriginalPreviewPaneMode(): string | null;
    getActionTokenValue(): string;
    isConversationViewDisabled(): Promise<boolean>;
    getGoogleRequestHeaders(): {
        [key: string]: string;
    };
    registerSuggestionsModifier(providerID: string): void;
    provideAutocompleteSuggestions(providerID: string, query: string, suggestions: AutocompleteSearchResultWithId[]): void;
    setupCustomListResultsQuery(query: string): void;
    setCustomListNewQuery(detail: {
        query: string;
        start: number;
        newQuery: string;
        newStart: number;
    }): void;
    setCustomListResults(query: string, newResults: string | null): void;
    createCustomSearchTerm(term: string): void;
    setSearchQueryReplacement(query: string, newQuery: string): void;
    registerComposeRequestModifier(keyId: string, appId: string): string;
    unregisterComposeRequestModifier(keyId: string, modifierId: string): void;
    modifyComposeRequest(keyId: string, modifierId: string, composeParams: any): void;
}
//# sourceMappingURL=gmail-page-communicator.d.ts.map