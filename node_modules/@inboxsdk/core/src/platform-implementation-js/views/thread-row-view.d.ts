import type GmailThreadRowView from '../dom-driver/gmail/views/gmail-thread-row-view';
import type { Contact, LabelDescriptor, ThreadDateDescriptor, DraftLabelDescriptor } from '../../inboxsdk';
import { Observable } from 'kefir';
import type TypedEventEmitter from 'typed-emitter';
export interface ImageDescriptor {
    imageUrl?: string;
    imageClass?: string;
    tooltip?: string;
    orderHint?: number;
    onHover?: (event: {
        hoverEnd: Promise<void>;
    }) => void;
}
type EmitterType = TypedEventEmitter<{
    destroy: () => void;
}>;
declare const ThreadRowView_base: new () => EmitterType;
export default class ThreadRowView extends ThreadRowView_base {
    /**
     * This property is set to true once the view is destroyed
     */
    destroyed: boolean;
    constructor(threadRowViewDriver: GmailThreadRowView);
    addLabel(labelDescriptor: LabelDescriptor | null | Observable<LabelDescriptor | null, unknown>): void;
    addImage(imageDescriptor: ImageDescriptor | Observable<ImageDescriptor | null, any>): void;
    addButton(buttonDescriptor: any): void;
    addActionButton(actionButtonDescriptor: Record<string, any>): void;
    addAttachmentIcon(threadRowAttachmentIconDescriptor: Record<string, any>): void;
    replaceDate(threadRowDateDescriptor: ThreadDateDescriptor | null | Observable<ThreadDateDescriptor | null, any>): void;
    replaceDraftLabel(draftLabelDescriptor: DraftLabelDescriptor | null | Observable<DraftLabelDescriptor | null, any>): void;
    getElement(): HTMLElement;
    getSubject(): string;
    replaceSubject(newSubjectStr: string): void;
    getDateString(): string;
    /** @deprecated */
    getThreadID(): string;
    getThreadIDAsync(): Promise<string>;
    /** @deprecated */
    getThreadIDIfStable(): string | null;
    getThreadIDIfStableAsync(): Promise<null | string>;
    getDraftID(): Promise<string | null | undefined>;
    /**
     * @returns the {number} of visible draft messages in the row. This is purely an estimate based on what is visible in the row.
     */
    getVisibleDraftCount(): number;
    getVisibleMessageCount(): number;
    getContacts(): Contact[];
}
export {};
//# sourceMappingURL=thread-row-view.d.ts.map