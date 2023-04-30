import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
export declare class NestedEditComponent extends React.Component<InlineComponentProps, any> {
    constructor(props: any);
    getEditable(field: any, modalType: string): boolean;
    checkReadonly: (readonly: boolean, currentModel: any) => boolean;
    getComponentForField(field: any, currentModelWithParent: any): JSX.Element;
    updateDefaultValue: (props: any) => void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    render(): any;
    select: (field: any, eventKey: any) => void;
    handleChange: (field: any, event: any) => void;
    handleFieldChange: (event: any) => void;
    collapseToggle: () => void;
}
