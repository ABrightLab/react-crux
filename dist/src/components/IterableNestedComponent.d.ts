import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
interface IterableNestedComponentProps extends InlineComponentProps {
    collapsable: boolean;
    collapsed: boolean;
    totalLength: number;
    collapseNestedToggle: Function;
    getIterableNestedTitle: Function;
    remove: Function;
    addAtIndex: Function;
    reorder: Function;
    reorderAtPosition: Function;
}
export declare class IterableNestedComponent extends React.Component<IterableNestedComponentProps, any> {
    constructor(props: any);
    collapseNestedToggle: () => void;
    showIterableButtons: () => void;
    hideIterableButtons: () => void;
    addAtIndex: () => void;
    reorder: (event: any) => void;
    reorderAtPosition: () => void;
    remove: () => void;
    customButtonAction: () => void;
    handleReorderClick: () => void;
    handleIntervalChange: (event: any) => void;
    iterableButtons: () => JSX.Element;
    render(): JSX.Element;
}
export {};
