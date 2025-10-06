import React from 'react';
type Props = {
    className?: string | null | undefined;
    el: HTMLElement;
};
export default class ElementContainer extends React.Component<Props> {
    _content: HTMLElement;
    _contentRefCb: (el: HTMLElement | null | undefined) => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    shouldComponentUpdate(nextProps: Props): boolean;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=ElementContainer.d.ts.map