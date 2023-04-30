import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
export interface IterableEditComponentProps extends InlineComponentProps {
    anchors: any;
}
export interface ImageUploadProps extends IterableEditComponentProps {
    width: string;
    height: string;
}
export declare class IterableEditComponent extends React.Component<ImageUploadProps | IterableEditComponentProps, any> {
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    iterableButtons(index: number, totalLength: number): JSX.Element;
    showIterableButtons(index: number): void;
    hideIterableButtons(index: number): void;
    getRepIterableField: (index: number) => any;
    getIterableNestedTitle(index: number): string;
    componentDidUpdate(): void;
    checkReadonly: (currentModel: any) => boolean;
    render(): JSX.Element;
    handleChange: (index: any, event: any) => void;
    fieldChanged: (index: any) => (field: any, value: any) => void;
    nestedFieldChanged: (index: any, value: any) => void;
    iterableDynamicTypeaheadFieldChange: (index: any, value: any, currentOption: any) => void;
    createNew: () => void;
    remove: (index: any) => void;
    collapseToggle: () => void;
    collapseNestedToggle: (index: number) => void;
    addAtIndex: (index: any) => void;
    getIterableDefaultValue: (iterableType: any) => any;
    handleReorderClick: () => void;
    handleIntervalChange: (event: any) => void;
    reorder(index: any, flag: number): void;
    reorderAtPosition: (index: any, moveAtPosition: number) => void;
}
