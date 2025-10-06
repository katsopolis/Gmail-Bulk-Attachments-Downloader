export type Handler<T> = (target: T) => void | Promise<void>;
export default class HandlerRegistry<T> {
    private _targets;
    private _pendingHandlers;
    private _handlers;
    registerHandler(handler: Handler<T>): () => void;
    addTarget(target: T): void;
    removeTarget(target: T): void;
    dumpHandlers(): void;
    private _informHandlerOfTargets;
    private _informHandlersOfTarget;
}
//# sourceMappingURL=handler-registry.d.ts.map