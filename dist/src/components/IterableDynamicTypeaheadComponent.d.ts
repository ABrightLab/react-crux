import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
interface IterableDynamicTypeaheadComponentProps extends InlineComponentProps {
    collapsable: boolean;
    totalLength: number;
    remove: Function;
    addAtIndex: Function;
    reorder: Function;
    reorderAtPosition: Function;
    type?: string;
    options?: any;
}
export declare class IterableDynamicTypeaheadComponent extends React.Component<IterableDynamicTypeaheadComponentProps, any> {
    constructor(props: any);
    showIterableButtons: () => void;
    hideIterableButtons: () => void;
    addAtIndex: () => void;
    reorder: (event: any) => void;
    reorderAtPosition: () => void;
    customButtonAction: () => void;
    remove: () => void;
    handleReorderClick: () => void;
    handleIntervalChange: (event: any) => void;
    iterableChange: (field: any, value: any, currentOption: any) => void;
    iterableButtons: () => JSX.Element;
    componentWillReceiveProps(nextProps: any): void;
    render(): JSX.Element;
}
export {};
