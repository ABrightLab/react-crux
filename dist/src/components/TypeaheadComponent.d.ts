import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
export declare class TypeaheadComponent extends React.Component<InlineComponentProps, any> {
    constructor(props: any);
    render(): JSX.Element;
    refreshMovements: () => void;
    handleChange: (selected: any) => void;
}
