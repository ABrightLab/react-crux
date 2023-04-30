import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
export declare class MultiSelectComponent extends React.Component<InlineComponentProps, any> {
    constructor(props: any);
    render(): JSX.Element;
    getModalValue: (modelData: any) => any;
    getTitle: (modelData: any) => any;
    select: (field: any, eventKey: any) => void;
}
