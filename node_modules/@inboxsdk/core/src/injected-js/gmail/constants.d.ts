import { Contact } from '../../inboxsdk';
export type ComposeRequestType = 'FIRST_DRAFT_SAVE' | 'DRAFT_SAVE' | 'SEND';
export type ComposeRequest = {
    draftID: string;
    to: Contact[] | null;
    cc: Contact[] | null;
    bcc: Contact[] | null;
    body: string;
    subject: string;
    type: ComposeRequestType;
};
export declare const SEND_ACTIONS: string[];
export declare const DRAFT_SAVING_ACTIONS: string[];
//# sourceMappingURL=constants.d.ts.map