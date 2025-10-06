import type ContentPanelViewDriver from '../driver-common/sidebar/ContentPanelViewDriver';
import type TypedEventEmitter from 'typed-emitter';
declare const ContentPanelView_base: new () => TypedEventEmitter<{
    activate(): void;
    deactivate(): void;
    destroy(): void;
}>;
export default class ContentPanelView extends ContentPanelView_base {
    #private;
    destroyed: boolean;
    constructor(contentPanelViewImplementation: ContentPanelViewDriver);
    remove(): void;
    close(): void;
    open(): void;
    isActive(): boolean;
}
export {};
//# sourceMappingURL=content-panel-view.d.ts.map