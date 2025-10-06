import type { Driver } from '../driver-interfaces/driver';
export interface AutocompleteSearchResult {
    name?: null | string;
    nameHTML?: null | string;
    description?: null | string;
    descriptionHTML?: null | string;
    routeName?: null | string;
    routeParams?: null | {
        [ix: string]: string | number;
    };
    externalURL?: null | string;
    searchTerm?: null | string;
    iconUrl?: null | string;
    iconClass?: null | string;
    iconHTML?: null | string;
    onClick?: null | (() => void);
}
export type SearchSuggestionsProvider = (query: string) => Array<AutocompleteSearchResult> | Promise<Array<AutocompleteSearchResult>>;
export interface SearchQueryRewriter {
    term: string;
    termReplacer(arg?: unknown): string | Promise<string>;
}
export default class Search {
    #private;
    constructor(appId: string, driver: Driver);
    registerSearchSuggestionsProvider(handler: (query: string) => Array<AutocompleteSearchResult> | Promise<Array<AutocompleteSearchResult>>): void;
    registerSearchQueryRewriter(rewriter: SearchQueryRewriter): void;
}
//# sourceMappingURL=search.d.ts.map