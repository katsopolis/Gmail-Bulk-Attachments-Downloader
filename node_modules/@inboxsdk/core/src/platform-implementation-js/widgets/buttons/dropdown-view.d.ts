import EventEmitter from '../../lib/safe-event-emitter';
import { Options as ContainByScreenOptions } from 'contain-by-screen';
interface Options {
    manualPosition?: boolean;
    extraElementsToIgnore?: HTMLElement[];
}
export default class DropdownView extends EventEmitter {
    private _dropdownViewDriver;
    destroyed: boolean;
    closed: boolean;
    private _options;
    private _userPlacementOptions;
    private _scrollableContainByScreen;
    private _didInsertContainerEl;
    el: HTMLElement;
    constructor(dropdownViewDriver: any, anchorElement: HTMLElement, options: Options | null | undefined);
    setPlacementOptions(options: ContainByScreenOptions): void;
    close(): void;
    reposition(): void;
}
export {};
//# sourceMappingURL=dropdown-view.d.ts.map