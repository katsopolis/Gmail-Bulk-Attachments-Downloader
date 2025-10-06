import * as Kefir from 'kefir';
export interface ItemWithLifetime<T> {
    readonly el: T;
    readonly removalStream: Kefir.Observable<null, never>;
}
export type ElementWithLifetime = ItemWithLifetime<HTMLElement>;
export default function makeElementChildStream(element: HTMLElement): Kefir.Observable<ElementWithLifetime, never>;
//# sourceMappingURL=make-element-child-stream.d.ts.map