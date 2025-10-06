import { AppMenuItemDescriptor } from '../../../namespaces/app-menu';
import GmailDriver from '../gmail-driver';
import TypedEventEmitter from 'typed-emitter';
export type MessageEvents = {
    click: (e: MouseEvent) => void;
    blur: (e: MouseEvent) => void;
    hover: (e: MouseEvent) => void;
    destroy: () => void;
};
export declare const NATIVE_CLASS: "Xa";
export declare const INBOXSDK_CLASS: "inboxsdk__appMenuItem";
export declare const ELEMENT_CLASS: "Xa inboxsdk__appMenuItem";
export declare const ICON_ELEMENT_SELECTOR: ".V6.CL";
declare const GmailAppMenuItemView_base: new () => TypedEventEmitter<MessageEvents>;
export declare class GmailAppMenuItemView extends GmailAppMenuItemView_base {
    #private;
    static elementCss: {
        readonly HOVER: "aIk";
        readonly ACTIVE: "apV";
        readonly SDK_ACTIVE: "inboxsdk__appMenuItem_active";
    };
    get element(): HTMLElement;
    set menuItemDescriptor(newMenuItemDescriptor: AppMenuItemDescriptor);
    get menuItemDescriptor(): AppMenuItemDescriptor;
    constructor(driver: GmailDriver, menuItemDescriptor: AppMenuItemDescriptor);
    remove(): void;
}
export {};
//# sourceMappingURL=gmail-app-menu-item-view.d.ts.map