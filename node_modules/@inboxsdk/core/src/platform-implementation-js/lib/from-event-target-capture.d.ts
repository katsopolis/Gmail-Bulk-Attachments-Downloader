import * as Kefir from 'kefir';
interface Emitter {
    addEventListener: Function;
    removeEventListener: Function;
}
export default function fromEventTargetCapture(target: Emitter, eventName: string): Kefir.Observable<any, never>;
export {};
//# sourceMappingURL=from-event-target-capture.d.ts.map