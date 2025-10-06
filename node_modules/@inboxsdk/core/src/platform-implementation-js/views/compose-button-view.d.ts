import EventEmitter from '../lib/safe-event-emitter';
import { ComposeButtonDescriptor, ComposeViewDriver } from '../driver-interfaces/compose-view-driver';
import { Driver } from '../driver-interfaces/driver';
import { AddedButtonEvents } from '../dom-driver/gmail/views/gmail-compose-view/add-button';
import { Bus } from 'kefir-bus';
export interface TooltipDescriptor {
    el?: null | HTMLElement;
    title?: null | string;
    subtitle?: null | string;
    imageUrl?: null | string;
    button?: null | {
        onClick?: Function;
        title: string;
    };
}
export interface Options {
    buttonDescriptor: ComposeButtonDescriptor | null | undefined;
    buttonViewController: any;
}
export default class ComposeButtonView extends EventEmitter {
    #private;
    destroyed: boolean;
    constructor(addedEventBus: Bus<AddedButtonEvents, unknown>, composeViewDriver: ComposeViewDriver, driver: Driver);
    showTooltip(tooltipDescriptor: TooltipDescriptor): void;
    closeTooltip(): void;
}
//# sourceMappingURL=compose-button-view.d.ts.map