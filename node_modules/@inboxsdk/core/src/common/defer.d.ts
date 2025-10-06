export interface Defer<T> {
    readonly resolve: (value: T) => void;
    readonly reject: (err: any) => void;
    readonly promise: Promise<T>;
}
export default function defer<T>(): Defer<T>;
//# sourceMappingURL=defer.d.ts.map