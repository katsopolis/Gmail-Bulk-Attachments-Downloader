import * as Kefir from 'kefir';
import type { Stopper } from 'kefir-stopper';
import DropdownView from '../../../widgets/buttons/dropdown-view';
import type Driver from '../gmail-driver';
import { AppToolbarButtonDescriptor } from '../../../../inboxsdk';
export default class GmailAppToolbarButtonView {
    _stopper: Stopper;
    _iconSettings: Record<string, any>;
    _element: HTMLElement | null | undefined;
    _activeDropdown: DropdownView | null | undefined;
    _buttonDescriptor: AppToolbarButtonDescriptor | null | undefined;
    _driver: Driver;
    constructor(driver: Driver, inButtonDescriptor: Kefir.Observable<AppToolbarButtonDescriptor, unknown>);
    destroy(): void;
    getStopper(): Stopper;
    getElement(): HTMLElement | null | undefined;
    open(): void;
    close(): void;
    _handleButtonDescriptor(buttonDescriptor: AppToolbarButtonDescriptor): void;
    _handleClick(): void;
}
//# sourceMappingURL=gmail-app-toolbar-button-view.d.ts.map