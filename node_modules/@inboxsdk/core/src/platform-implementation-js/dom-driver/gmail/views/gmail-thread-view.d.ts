import * as Kefir from 'kefir';
import SimpleElementView from '../../../views/SimpleElementView';
import CustomMessageView from '../../../views/conversations/custom-message-view';
import type GmailDriver from '../gmail-driver';
import GmailMessageView from './gmail-message-view';
import GmailToolbarView from './gmail-toolbar-view';
import type { CustomMessageDescriptor } from '../../../views/conversations/custom-message-view';
import { type ContentPanelDescriptor } from '../../../driver-common/sidebar/ContentPanelViewDriver';
import type GmailRouteView from './gmail-route-view/gmail-route-view';
import BasicButtonViewController from '../../../widgets/buttons/basic-button-view-controller';
import { type ButtonDescriptor } from '../../../../inboxsdk';
declare class GmailThreadView {
    #private;
    constructor(element: HTMLElement, routeViewDriver: GmailRouteView, driver: GmailDriver, isPreviewedThread?: boolean);
    getMessageViewDriverStream(): Kefir.Observable<GmailMessageView, unknown>;
    isLoadingStub(): boolean;
    getStopper(): import("kefir-stopper").Stopper;
    getEventStream(): Kefir.Observable<Record<string, any>, unknown>;
    getElement(): HTMLElement;
    getRouteViewDriver(): any;
    getIsPreviewedThread(): boolean;
    getToolbarView(): GmailToolbarView | undefined;
    getMessageViewDrivers(): GmailMessageView[];
    destroy(): void;
    addSidebarContentPanel(descriptor: Kefir.Observable<ContentPanelDescriptor, unknown>): import("../../../driver-common/sidebar/ContentPanelViewDriver").default;
    addNoticeBar(): SimpleElementView;
    registerHiddenCustomMessageNoticeProvider(provider: (numberCustomMessagesHidden: number, numberNativeMessagesHidden: number | null | undefined, unmountPromise: Promise<void>) => HTMLElement): void;
    addCustomMessage(descriptorStream: Kefir.Observable<CustomMessageDescriptor, unknown>): CustomMessageView;
    getSubject(): string;
    getInternalID(): string;
    getThreadID(): string;
    getThreadIDAsync(): Promise<string>;
    addLabel(): SimpleElementView;
    addSubjectButton(button: ButtonDescriptor): BasicButtonViewController;
    addFooterButton(button: ButtonDescriptor): BasicButtonViewController;
    getReadyStream(): Kefir.Observable<any, unknown>;
}
export default GmailThreadView;
//# sourceMappingURL=gmail-thread-view.d.ts.map