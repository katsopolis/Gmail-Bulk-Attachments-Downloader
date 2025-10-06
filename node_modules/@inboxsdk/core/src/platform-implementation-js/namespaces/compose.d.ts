import ComposeView from '../views/compose-view';
import type Membrane from '../lib/Membrane';
import type { Handler } from '../lib/handler-registry';
import type { Driver } from '../driver-interfaces/driver';
export default class Compose {
    constructor(driver: Driver, membrane: Membrane);
    registerComposeViewHandler(handler: Handler<ComposeView>): () => void;
    openNewComposeView(): Promise<ComposeView>;
    openDraftByMessageID(messageID: string): Promise<ComposeView>;
    /** @deprecated Use {@link openNewComposeView} instead */
    getComposeView(): Promise<ComposeView>;
}
//# sourceMappingURL=compose.d.ts.map