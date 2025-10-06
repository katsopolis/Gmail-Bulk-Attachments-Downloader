import * as Kefir from 'kefir';
export interface OutsideEvent {
    type: 'outsideInteraction' | 'escape';
    cause: Event;
}
export default function outsideClicksAndEscape(elements: HTMLElement[]): Kefir.Observable<OutsideEvent, never>;
//# sourceMappingURL=outsideClicksAndEscape.d.ts.map