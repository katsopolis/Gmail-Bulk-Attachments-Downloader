import * as Kefir from 'kefir';
import InboxBackdrop from './inbox-backdrop';
import type { DrawerViewOptions } from '../../../driver-interfaces/driver';
import type ComposeView from '../../../views/compose-view';
declare class InboxDrawerView {
    _chrome: boolean;
    _exitEl: HTMLElement;
    _containerEl: HTMLElement;
    _el: HTMLElement;
    _backdrop: InboxBackdrop | null | undefined;
    _slideAnimationDone: Kefir.Observable<null, unknown>;
    _closing: import("kefir-stopper").Stopper;
    _closed: import("kefir-stopper").Stopper;
    _composeChanges: import("kefir-bus").Bus<unknown, unknown>;
    _preAutoCloseStream: import("kefir-bus").Bus<unknown, unknown>;
    constructor(options: DrawerViewOptions);
    _setupComposeInsertionTarget(composeView: ComposeView, closeWithCompose: boolean | null | undefined): {
        composeRect: ClientRect;
        insertionTarget: HTMLElement;
    };
    _setupElement(options: DrawerViewOptions, insertionTarget: HTMLElement): void;
    _setupComposeAnimation(composeView: ComposeView, composeRect: ClientRect, forceLayout: boolean): number;
    _positionCompose(composeView: ComposeView, composeNeedToMoveLeft: number): void;
    associateComposeView(composeView: ComposeView, closeWithCompose: boolean): void;
    disassociateComposeView(): void;
    getSlideAnimationDone(): Kefir.Observable<null, unknown>;
    getClosingStream(): import("kefir-stopper").Stopper;
    getClosedStream(): import("kefir-stopper").Stopper;
    getPreAutoCloseStream(): import("kefir-bus").Bus<unknown, unknown>;
    close(): void;
}
export default InboxDrawerView;
//# sourceMappingURL=inbox-drawer-view.d.ts.map