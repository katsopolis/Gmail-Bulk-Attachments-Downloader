export interface LoadScriptOptions {
    nowrap?: boolean;
    disableSourceMappingURL?: boolean;
    XMLHttpRequest?: typeof XMLHttpRequest;
}
export default function loadScript(url: string, opts?: LoadScriptOptions): Promise<void>;
//# sourceMappingURL=load-script.d.ts.map