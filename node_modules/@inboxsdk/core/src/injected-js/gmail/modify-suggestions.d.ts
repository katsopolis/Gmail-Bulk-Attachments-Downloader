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
    /** @deprecated use iconUrl instead */
    iconURL?: null | string;
    iconUrl?: null | string;
    iconClass?: null | string;
    iconHTML?: null | string;
    onClick?: null | (() => void);
}
export interface AutocompleteSearchResultWithId extends AutocompleteSearchResult {
    id: string;
    providerId: string;
}
declare function modifySuggestions(responseText: string, modifications: AutocompleteSearchResultWithId[]): string;
declare const _default: typeof modifySuggestions;
export default _default;
//# sourceMappingURL=modify-suggestions.d.ts.map