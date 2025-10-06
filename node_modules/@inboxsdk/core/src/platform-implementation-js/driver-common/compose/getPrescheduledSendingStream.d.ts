import * as Kefir from 'kefir';
export default function getPrescheduledSendingStream({ element, scheduleSendButton, moreSendOptionsButton, }: {
    element: HTMLElement;
    scheduleSendButton: HTMLElement;
    moreSendOptionsButton: HTMLElement;
}): Kefir.Observable<{
    eventName: "scheduleSendMenuOpening";
    data: {
        cancel(): void;
    };
}, unknown>;
//# sourceMappingURL=getPrescheduledSendingStream.d.ts.map