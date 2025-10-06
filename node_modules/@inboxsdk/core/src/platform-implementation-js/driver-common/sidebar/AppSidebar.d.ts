import React from 'react';
import DraggableList from 'react-draggable-list';
type ExpansionSettings = {
    apps: Record<string, {
        ids: Record<string, {
            lastUse: number;
            expanded: boolean;
        }>;
    }>;
};
export type PanelDescriptor = {
    instanceId: string;
    appId: string;
    id: string;
    title?: string;
    iconClass: string | null | undefined;
    iconLiga?: string;
    iconUrl: string | null | undefined;
    hideTitleBar: boolean;
    el: HTMLElement;
    appName?: string;
};
export type Props = {
    panels: PanelDescriptor[];
    onClose?: () => void;
    onOutsideClick?: () => void;
    onMoveEnd(newList: PanelDescriptor[], item: PanelDescriptor, oldIndex: number, newIndex: number): void;
    onExpandedToggle?: () => void;
    container?: () => HTMLElement;
};
type State = {
    expansionSettings: ExpansionSettings;
};
export default class AppSidebar extends React.Component<Props, State> {
    _list: DraggableList<any, any, any>;
    _main: HTMLElement;
    _stopper: import("kefir-stopper").Stopper;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    scrollPanelIntoView(instanceId: string, useContainer?: boolean): void;
    closePanel(instanceId: string): void;
    openPanel(instanceId: string): void;
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    _expandedToggle(appId: string, id: string, expanded: boolean): void;
    _readExpansionSettings(): ExpansionSettings;
    _saveExpansionSettings(data: ExpansionSettings): void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=AppSidebar.d.ts.map