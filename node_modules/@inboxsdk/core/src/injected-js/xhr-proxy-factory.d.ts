export type Opts = {
    logError: (error: unknown, details?: any) => void;
};
/**
 * Object with information about the connection in progress. Its fields are
 * populated as the connection goes on. The object is passed as the first
 * argument to all of the wrappers. The object is mutable so the wrappers can
 * add properties to it.
 *
 * @typedef {Object} XHRProxyConnectionDetails
 * @property {string} method
 * @property {string} url
 * @property {Object} params - parameters decoded from the URL
 * @property {Object} headers - request headers set on the XHR
 * @property {string} responseType
 * @property {string} originalSendBody - data passed to send method
 * @property {number} status - HTTP response status
 * @property {string} [originalResponseText] - Is not set if responseType is set
 *  to a value besides 'text'.
 * @property {string} [modifiedResponseText]
 */
export type XHRProxyConnectionDetails = {
    method: string;
    url: string;
    params: Record<string, string>;
    headers: Record<string, string>;
    responseType: string;
    originalSendBody: string | null | undefined;
};
export type XHRProxyConnectionDetailsWithResponse = XHRProxyConnectionDetails & {
    status: number;
    originalResponseText: string;
    modifiedResponseText: string;
};
export type XHRProxyConnectionDetailsAfterListeners = XHRProxyConnectionDetails & {
    status: number;
    originalResponseText: string | null | undefined;
    modifiedResponseText: string | null | undefined;
};
/**
 * Thing
 *
 * @callback XHRProxyWrapperCallback
 * @param {XHRProxyConnectionDetails} connection
 */
type Request = {
    method: string;
    url: string;
    body: string;
};
/**
 * Wrapper object contains optional callbacks that get run for completed
 * requests, and a required isRelevantTo method that filters what types of
 * requests the methods should be called for. All methods are passed an object
 * with details about the connection as the first argument. Some methods are
 * called with a relevant second argument (which is also present within the
 * connection argument).
 *
 * @typedef {Object} XHRProxyWrapper
 * @property {XHRProxyWrapperCallback} isRelevantTo - returns true if wrapper should be used
 *  for request.
 * @property {XHRProxyWrapperCallback} [originalSendBodyLogger] - called with value passed to
 *  send.
 * @property {XHRProxyWrapperCallback} [requestChanger] - Allows the protocol, URL, and body
 *  to be changed together before the connection is opened and sent.
 * @property {XHRProxyWrapperCallback} [originalResponseTextLogger] - called with the responseText as
 *  given by the server. Is not called if responseType is set to a value besides 'text'.
 * @property {XHRProxyWrapperCallback} [responseTextChanger] - called with the responseText as given
 *  by the server and returns new responseText value. Is not called if responseType
 * is set to a value besides 'text'.
 * @property {XHRProxyWrapperCallback} [finalResponseTextLogger] - called with the responseText as
 *  delivered to application code. Is not called if responseType is set to a value besides 'text'.
 * @property {XHRProxyWrapperCallback} [afterListeners] - called after all event listeners
 *  for readystatechange have run
 */
export type Wrapper = {
    isRelevantTo: (connection: XHRProxyConnectionDetails) => boolean;
    originalSendBodyLogger?: (connection: XHRProxyConnectionDetails, body: string) => void;
    requestChanger?: (connection: XHRProxyConnectionDetails, request: Record<string, any>) => Request | Promise<Request>;
    originalResponseTextLogger?: (connection: XHRProxyConnectionDetailsWithResponse, originalResponseText: string) => void;
    responseTextChanger?: (connection: XHRProxyConnectionDetailsWithResponse, originalResponseText: string) => string | Promise<string>;
    finalResponseTextLogger?: (connection: XHRProxyConnectionDetailsWithResponse, finalResponseText: string) => void;
    afterListeners?: (connection: XHRProxyConnectionDetailsAfterListeners) => void;
};
/**
 * Creates a drop-in replacement for the XMLHttpRequest constructor that can
 * have wrappers which may log or modify server responses. See
 * test/xhrproxy.js for usage examples and tests.
 * @function XHRProxyFactory
 * @param {function} XHR - original XMLHttpRequest constructor to wrap
 * @param {XHRProxyWrapper[]} wrappers - mutable array
 * @param {Object} [opts] - Can specify a logError function
 * @returns {function} wrapped XMLHttpRequest-like constructor
 */
export default function XHRProxyFactory(XHR: typeof XMLHttpRequest, wrappers: Wrapper[], opts: Opts): typeof XMLHttpRequest;
export {};
//# sourceMappingURL=xhr-proxy-factory.d.ts.map