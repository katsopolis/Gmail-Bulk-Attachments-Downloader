import type TypedEventEmitter from 'typed-emitter';
import type GmailMoleViewDriver from '../dom-driver/gmail/widgets/gmail-mole-view-driver';
type MoleViewEvent = {
    destroy(): void;
    minimize(): void;
    restore(): void;
};
export interface IMoleView extends TypedEventEmitter<MoleViewEvent> {
    close(): void;
    getMinimized(): boolean;
    setMinimized(value: boolean): void;
    setTitle(title: string): void;
}
declare const MoleView_base: new () => TypedEventEmitter<MoleViewEvent>;
export default class MoleView extends MoleView_base implements IMoleView {
    destroyed: boolean;
    constructor(options: {
        moleViewDriver: GmailMoleViewDriver;
    });
    close(): void;
    setTitle(text: string): void;
    setMinimized(minimized: boolean): void;
    getMinimized(): boolean;
}
export {};
//# sourceMappingURL=mole-view.d.ts.map