import type { Bus } from 'kefir-bus';
type BoundingBox = [
    {
        x: number;
        y: number;
    },
    {
        x: number;
        y: number;
    }
];
type PositionType = 'left' | 'right' | 'top' | 'bottom';
type BoundingBoxWrapper = {
    type: PositionType;
    value: BoundingBox;
    smallestDistance?: number;
};
export default class GmailTooltipView {
    _element: HTMLElement;
    _eventStream: Bus<any, unknown>;
    _stopper: import("kefir-stopper").Stopper;
    constructor(options?: Record<string, any>);
    destroy(): void;
    getElement(): HTMLElement;
    getStopper(): import("kefir-stopper").Stopper;
    getEventStream(): Bus<any, unknown>;
    anchor(anchorElement: HTMLElement, placementOptions: Record<string, any>): void;
    getContainerElement(): HTMLElement;
    getContentElement(): HTMLElement;
    close(): void;
    _setupElement(options: Record<string, any>): void;
    _getAutomaticPlacementBoundingBox(targetBoundingBox: ClientRect, tipBoundingBox: ClientRect): BoundingBoxWrapper;
    _getTopPositionBoundingBox(targetBoundingBox: ClientRect, tipBoundingBox: ClientRect): BoundingBox;
    _getRightPositionBoundingBox(targetBoundingBox: ClientRect, tipBoundingBox: ClientRect): BoundingBox;
    _getBottomPositionBoundingBox(targetBoundingBox: ClientRect, tipBoundingBox: ClientRect): BoundingBox;
    _getLeftPositionBoundingBox(targetBoundingBox: ClientRect, tipBoundingBox: ClientRect): BoundingBox;
    _figureOutBestBoundingBox(boundingBoxWrappers: Array<BoundingBoxWrapper>): BoundingBoxWrapper;
    _getSmallestDistance(boundingBoxWrapper: BoundingBoxWrapper): number;
    _containBoundingBox(boundingBox: BoundingBox, offset?: {
        left?: number;
        top?: number;
    }): BoundingBox;
    _setPositionAtBoundingBox(boundingBox: BoundingBox): void;
    _setArrowPosition(type: PositionType, containedBoundingBox: BoundingBox, targetBoundingBox: ClientRect): void;
}
export {};
//# sourceMappingURL=gmail-tooltip-view.d.ts.map