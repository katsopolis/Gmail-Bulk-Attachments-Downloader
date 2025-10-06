import * as Kefir from 'kefir';
export default class StopperPool<V, E> {
    private _streamCount;
    private _ended;
    private _pool;
    stream: Kefir.Observable<V, E>;
    constructor(streams: Kefir.Observable<V, E> | Kefir.Observable<V, E>[]);
    add(newStreams: Kefir.Observable<V, E> | Kefir.Observable<V, E>[]): void;
    getSize(): number;
}
//# sourceMappingURL=stopper-pool.d.ts.map