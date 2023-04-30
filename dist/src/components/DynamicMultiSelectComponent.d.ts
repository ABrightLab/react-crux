import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
export declare class DynamicMultiSelectComponent extends React.Component<InlineComponentProps, any> {
    constructor(props: any);
    componentDidMount(): void;
    handleSearch: (query: string, callback: Function) => void;
    loadOptionsData(options: any[]): any;
    loadSelectedValue(optionsData: any[]): any;
    render(): JSX.Element;
    getModalValue: (modelData: any) => any;
    getTitle: (modelData: any) => any;
    select: (field: any, eventKey: any) => void;
}
