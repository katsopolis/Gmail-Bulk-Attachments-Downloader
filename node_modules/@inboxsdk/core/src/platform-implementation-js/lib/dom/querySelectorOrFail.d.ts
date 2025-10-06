export declare class SelectorError extends Error {
    name: string;
    constructor(selector: string, options?: {
        cause: unknown;
    });
}
export default function querySelector(el: Document | DocumentFragment | Element, selector: string): HTMLElement;
//# sourceMappingURL=querySelectorOrFail.d.ts.map