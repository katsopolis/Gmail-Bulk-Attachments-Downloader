export interface CommonAjaxOpts {
    url: string;
    method?: string;
    cachebust?: boolean;
    headers?: {
        [index: string]: string;
    };
    xhrFields?: object;
    data?: {
        [index: string]: string;
    } | string;
    canRetry?: boolean;
    retryNum?: number;
}
export interface AjaxOpts extends CommonAjaxOpts {
    XMLHttpRequest?: typeof XMLHttpRequest;
}
export interface AjaxResponse {
    text: string;
    xhr: XMLHttpRequest;
}
export default function ajax(opts: AjaxOpts): Promise<AjaxResponse>;
//# sourceMappingURL=ajax.d.ts.map