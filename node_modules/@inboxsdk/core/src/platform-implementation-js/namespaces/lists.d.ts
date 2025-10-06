import type Membrane from '../lib/Membrane';
import type { Driver } from '../driver-interfaces/driver';
export default class Lists {
    ActionButtonTypes: Readonly<{
        LINK: "LINK";
        DROPDOWN: "DROPDOWN";
        ACTION: "ACTION";
    }>;
    constructor(appId: string, driver: Driver, membrane: Membrane);
    registerThreadRowViewHandler(handler: (...args: Array<any>) => any): () => void;
    getSelectedThreadRowViews(): any[];
    registerThreadRowViewSelectionHandler(handler: () => any): () => void;
}
//# sourceMappingURL=lists.d.ts.map