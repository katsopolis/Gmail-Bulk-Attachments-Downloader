import LiveSet from 'live-set';
import * as Kefir from 'kefir';
import type { ItemWithLifetime } from './dom/make-element-child-stream';
export default function toLiveSet<T>(itemWithLifetimeStream: Kefir.Observable<ItemWithLifetime<T>, unknown>): LiveSet<T>;
//# sourceMappingURL=toLiveSet.d.ts.map