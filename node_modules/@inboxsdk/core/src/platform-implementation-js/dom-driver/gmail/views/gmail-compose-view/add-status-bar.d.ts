import SimpleElementView from '../../../../views/SimpleElementView';
import GmailComposeView from '../gmail-compose-view';
import { StatusBar as IStatusBar } from '../../../../driver-interfaces/compose-view-driver';
declare const _default: typeof addStatusBar;
export default _default;
declare function addStatusBar(gmailComposeView: GmailComposeView, options: {
    height?: number;
    orderHint?: number;
    addAboveNativeStatusBar?: boolean;
}): StatusBar;
declare class StatusBar extends SimpleElementView implements IStatusBar {
    private _addAboveNativeStatusBar;
    private _gmailComposeView;
    private _nativeStatusContainer;
    private _prependContainer;
    private _stopper;
    constructor(gmailComposeView: GmailComposeView, height: number, orderHint: number, addAboveNativeStatusBar: boolean);
    destroy(): void;
    setHeight(newHeight: number): void;
    private _updateTotalHeight;
    private _setStatusBar;
}
//# sourceMappingURL=add-status-bar.d.ts.map