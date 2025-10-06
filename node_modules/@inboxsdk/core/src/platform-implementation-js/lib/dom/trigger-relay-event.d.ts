interface RelayProps {
    type: string;
    bubbles: boolean;
    cancelable: boolean;
    props?: any;
    dataTransfer?: {
        files: Blob[];
    } | null;
}
export default function triggerRelayEvent(element: HTMLElement, detail: RelayProps): Promise<void>;
export {};
//# sourceMappingURL=trigger-relay-event.d.ts.map