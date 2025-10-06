import * as Kefir from 'kefir';
import type { Bus } from 'kefir-bus';
declare class GmailModalViewDriver {
    _eventStream: Bus<any, unknown>;
    _modalContainerElement: HTMLElement;
    constructor(options: Object);
    destroy(): void;
    getModalContainerElement(): HTMLElement;
    getEventStream(): Kefir.Observable<any, unknown>;
    _processOptions(options: any): void;
    setTitle(title: string): void;
    setContentElement(element: HTMLElement): void;
    setButtons(buttons: any[]): void;
    setChromeClass(chrome: boolean, showCloseButton: boolean, hasButtons: boolean): void;
    _setupModalContainerElement(options: any): void;
    _addButton(buttonContainer: HTMLElement, buttonDescriptor: any): void;
    _setupEventStream(): void;
}
export default GmailModalViewDriver;
//# sourceMappingURL=gmail-modal-view-driver.d.ts.map