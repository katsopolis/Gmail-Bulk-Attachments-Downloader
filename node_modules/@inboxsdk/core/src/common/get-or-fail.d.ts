interface Get {
    <K, V>(map: Map<K, V>, key: K): V;
    <K extends object, V>(map: WeakMap<K, V>, key: K): V;
}
declare const get: Get;
export default get;
//# sourceMappingURL=get-or-fail.d.ts.map