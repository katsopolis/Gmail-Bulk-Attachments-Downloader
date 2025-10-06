import * as Kefir from 'kefir';
/**
 * Returns a Kefir stream that repeatedly calls the condition callback until it
 * returns a truthy value, and then the stream emits that value and ends.
 * If the timeout passes, an error event is emitted and the error is also
 * thrown so that it gets logged. Well-behaving code should not let the timeout
 * get tripped.
 */
export default function streamWaitFor<T>(condition: () => T | null | undefined, timeout?: number, steptime?: number): Kefir.Observable<T, Error>;
//# sourceMappingURL=stream-wait-for.d.ts.map