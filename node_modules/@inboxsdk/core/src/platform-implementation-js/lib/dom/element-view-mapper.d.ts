/**
 * Returns a function suitable for mapping over a stream returned from
 * makeElementChildStream or kefirMakeElementChildStream. */
type View = {
    destroy(): void;
};
import type { ElementWithLifetime } from './make-element-child-stream';
export default function elementViewMapper<T extends View>(viewFn: (el: HTMLElement) => T): (event: ElementWithLifetime) => T;
export {};
//# sourceMappingURL=element-view-mapper.d.ts.map