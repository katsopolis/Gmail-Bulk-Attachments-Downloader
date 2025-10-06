interface Policy {
    /**
     * This method returns a {@link TrustedTypePolicy},
     * but typescript@5.3.3's lib.dom doesn't support assigning non-strings
     * to {@link HTMLElement.innerHTML}.
     */
    createHTML(string: string): string;
}
declare global {
    /**
     * typescript@5.3.3 doesn't ship types for trustedTypes yet.
     * Safari 17.2 doesn't support it either, so a fallback is needed if
     * it's not defined.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/TrustedHTML
     */
    var trustedTypes: {
        createPolicy(name: string, policy: Policy): Policy;
    } | undefined;
}
/**
 * This policy object is used to strip HTML tags from a string.
 */
export declare const removeHtmlTagsPolicy: Policy;
export {};
//# sourceMappingURL=removeHtmlTags.d.ts.map