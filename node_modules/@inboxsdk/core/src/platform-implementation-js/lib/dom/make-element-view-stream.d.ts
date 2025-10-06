import * as Kefir from 'kefir';
interface View {
    destroy(): void;
}
import { ElementWithLifetime } from './make-element-child-stream';
export default function makeElementViewStream<T extends View>(viewFn: (el: HTMLElement) => T | null | undefined): (event: ElementWithLifetime) => Kefir.Observable<T, never>;
export {};
//# sourceMappingURL=make-element-view-stream.d.ts.map