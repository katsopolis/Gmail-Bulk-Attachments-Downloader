export default class PersistentQueue<T> {
    private _fallbackQueue;
    private _sid;
    constructor(id: string);
    private _getSavedQueue;
    private _putSavedQueue;
    private _clearSavedQueue;
    add(val: T): void;
    remove(): T | undefined;
    removeAll(): T[];
    peekAll(): T[];
    clear(): void;
}
//# sourceMappingURL=persistent-queue.d.ts.map