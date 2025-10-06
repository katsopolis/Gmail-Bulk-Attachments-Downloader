import * as Kefir from 'kefir';
export default function ({ element, sendButton, sendAndArchive, }: {
    element: HTMLElement;
    sendButton: HTMLElement;
    sendAndArchive?: HTMLElement | null | undefined;
}): Kefir.Observable<{
    eventName: "presending";
    data: {
        cancel(): void;
    };
}, never>;
//# sourceMappingURL=getPresendingStream.d.ts.map