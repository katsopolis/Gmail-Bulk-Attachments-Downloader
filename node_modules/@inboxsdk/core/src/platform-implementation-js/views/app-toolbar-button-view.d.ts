import type { Driver } from '../driver-interfaces/driver';
import type AppToolbarButtonViewDriver from '../dom-driver/gmail/views/gmail-app-toolbar-button-view';
import type { AppToolbarButtonView as IAppToolbarButtonView } from '../../inboxsdk';
import TypedEventEmitter from 'typed-emitter';
declare const AppToolbarButtonView_base: new () => TypedEventEmitter<{
    destroy: () => void;
}>;
export default class AppToolbarButtonView extends AppToolbarButtonView_base implements IAppToolbarButtonView {
    destroyed: boolean;
    constructor(driver: Driver, appToolbarButtonViewDriverPromise: Promise<AppToolbarButtonViewDriver>);
    open(): void;
    close(): void;
    remove(): void;
}
export {};
//# sourceMappingURL=app-toolbar-button-view.d.ts.map