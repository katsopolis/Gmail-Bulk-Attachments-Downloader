import * as Kefir from 'kefir';
import GmailActionButtonView from '../widgets/gmail-action-button-view';
import type GmailDriver from '../gmail-driver';
import type GmailRowListView from './gmail-row-list-view';
import { IconSettings } from '../../../driver-common/update-icon';
import type { Contact, ImageDescriptor, LabelDescriptor, ThreadDateDescriptor } from '../../../../inboxsdk';
type LabelMod = {
    gmailLabelView: Record<string, any>;
    remove(): void;
};
type ActionButtonMod = {
    gmailActionButtonView: GmailActionButtonView;
    remove(): void;
};
type ButtonMod = {
    buttonEl: HTMLElement;
    iconSettings: IconSettings;
    remove(): void;
};
type ImageMod = {
    iconSettings: IconSettings;
    iconWrapper: HTMLElement;
    remove(): void;
};
type ReplacedDateMod = {
    el: HTMLElement;
    remove(): void;
};
type ReplacedDraftLabelMod = ReplacedDateMod;
type Mods = {
    label: {
        unclaimed: LabelMod[];
        claimed: LabelMod[];
    };
    action: {
        unclaimed: ActionButtonMod[];
        claimed: ActionButtonMod[];
    };
    button: {
        unclaimed: ButtonMod[];
        claimed: ButtonMod[];
    };
    image: {
        unclaimed: ImageMod[];
        claimed: ImageMod[];
    };
    replacedDate: {
        unclaimed: ReplacedDateMod[];
        claimed: ReplacedDateMod[];
    };
    replacedDraftLabel: {
        unclaimed: ReplacedDraftLabelMod[];
        claimed: ReplacedDraftLabelMod[];
    };
};
declare class GmailThreadRowView {
    #private;
    _elements: HTMLElement[];
    _modifications: Mods;
    _alreadyHadModifications: boolean;
    _rowListViewDriver: GmailRowListView;
    _driver: GmailDriver;
    _userView: Record<string, any> | null | undefined;
    _cachedThreadID: string | null | undefined;
    _cachedSyncThreadID: string | null | undefined;
    _cachedSyncDraftIDPromise: Promise<string | null | undefined> | null | undefined;
    _stopper: import("kefir-stopper").Stopper;
    _refresher: Kefir.Observable<null, any> | null | undefined;
    _subjectRefresher: Kefir.Observable<null, any> | null | undefined;
    _imageRefresher: Kefir.Observable<null, any> | null | undefined;
    _isVertical: boolean;
    _isDestroyed: boolean;
    constructor(element: HTMLElement, rowListViewDriver: GmailRowListView, gmailDriver: GmailDriver);
    destroy(): void;
    getElement(): HTMLElement;
    _removeUnclaimedModifications(): void;
    getAlreadyHadModifications(): boolean;
    /**
     * @returns a Kefir stream that emits this object once this object is ready for the user.
     *
     * It should almost always synchronously ready immediately, but there's
     * a few cases such as with multiple inbox or the drafts page that it needs a moment.
     * make sure you take until by on the @see GmailThreadRowView#getStopper because waitForReady
     * must not be called after the GmailThreadRowView is destroyed
     */
    waitForReady(): Kefir.Observable<GmailThreadRowView, unknown>;
    setUserView(userView: Record<string, any>): void;
    _expandColumn(colSelector: string, width: number): void;
    addLabel(label: LabelDescriptor | null | Kefir.Observable<LabelDescriptor | null, unknown>): void;
    addImage(inIconDescriptor: ImageDescriptor | Kefir.Observable<ImageDescriptor | null, any>): void;
    addButton(buttonDescriptor: Record<string, any>): void;
    addActionButton(actionButtonDescriptor: Record<string, any>): void;
    addAttachmentIcon(opts: Record<string, any>): void;
    _fixDateColumnWidth(): void;
    replaceDraftLabel(opts: ThreadDateDescriptor | null | Kefir.Observable<ThreadDateDescriptor | null, any>): void;
    replaceDate(opts: ThreadDateDescriptor | null | Kefir.Observable<ThreadDateDescriptor | null, any>): void;
    getEventStream(): import("kefir-stopper").Stopper;
    getStopper(): import("kefir-stopper").Stopper;
    getSubject(): string;
    _getSubjectSelector(): HTMLElement;
    replaceSubject(newSubjectStr: string): void;
    getDateString(): string;
    _threadIdReady(): boolean;
    _getThreadID(): string | null | undefined;
    getThreadID(): string;
    /**
     * This method is never called in the view proper.
     * GmailThreadRowView#getThreadIDAsync is called though.
     */
    getSyncThreadID(): Promise<string | null | undefined>;
    getThreadIDAsync(): Promise<string>;
    getDraftID(): Promise<string | null | undefined>;
    getVisibleDraftCount(): number;
    getVisibleMessageCount(): number;
    getContacts(): Contact[];
    isSelected(): boolean;
    _getLabelParent(): HTMLElement;
    _getWatchElement(): HTMLElement;
    _getRefresher(): Kefir.Observable<null, any>;
    _getSubjectRefresher(): Kefir.Observable<null, unknown>;
    _getImageContainerRefresher(): Kefir.Observable<null, unknown>;
}
export default GmailThreadRowView;
export declare function removeAllThreadRowUnclaimedModifications(): void;
//# sourceMappingURL=gmail-thread-row-view.d.ts.map