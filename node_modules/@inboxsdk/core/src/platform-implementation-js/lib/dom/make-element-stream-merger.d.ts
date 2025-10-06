import * as Kefir from 'kefir';
import { ItemWithLifetime } from './make-element-child-stream';
export default function makeElementStreamMerger<T>(): (event: ItemWithLifetime<T>) => Kefir.Observable<ItemWithLifetime<T>, never>;
//# sourceMappingURL=make-element-stream-merger.d.ts.map