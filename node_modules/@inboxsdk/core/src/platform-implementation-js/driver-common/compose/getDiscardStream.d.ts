import * as Kefir from 'kefir';
export default function getDiscardStream({ element, discardButton, }: {
    element: HTMLElement;
    discardButton: HTMLElement;
}): Kefir.Observable<{
    eventName: "discard";
    data: {
        cancel(): void;
    };
}, never>;
//# sourceMappingURL=getDiscardStream.d.ts.map