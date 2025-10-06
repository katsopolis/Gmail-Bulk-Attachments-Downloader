declare global {
    /** Set by webpack.DefinePlugin to remove a code block potentially flagged by Chrome Web Store reviews. */
    var NPM_MV2_SUPPORT: false | undefined;
}
export declare const injectScript: () => Promise<null>;
export declare function setInjectScriptImplementation(fn: () => void): void;
//# sourceMappingURL=inject-script.d.ts.map