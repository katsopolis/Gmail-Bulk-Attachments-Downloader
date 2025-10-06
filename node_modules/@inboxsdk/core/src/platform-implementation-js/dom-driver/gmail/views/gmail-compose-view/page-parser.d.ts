import PageParserTree from 'page-parser-tree';
import Logger from '../../../../lib/logger';
export declare function makePageParser(element: HTMLElement, logger: Logger): PageParserTree;
export declare function getRecipientChips(element: HTMLElement, addressType: 'to' | 'cc' | 'bcc'): Array<HTMLElement> | NodeListOf<HTMLElement>;
export declare function getRecipientRowElements(element: HTMLElement): HTMLElement[];
export declare function getRecipientRowForType(element: HTMLElement, addressType: 'to' | 'cc' | 'bcc'): HTMLElement | null;
export declare function getOldRecipientRowForType(element: HTMLElement, addressType: 'to' | 'cc' | 'bcc'): HTMLElement | null;
//# sourceMappingURL=page-parser.d.ts.map