import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
export declare class NestedEditModalComponent extends React.Component<InlineComponentProps, any> {
    constructor(props: any);
    modelChanged: (value: any) => void;
    getComponent(): JSX.Element;
    render(): JSX.Element;
    collapseToggle: () => void;
}
