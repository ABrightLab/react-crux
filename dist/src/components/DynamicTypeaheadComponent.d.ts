import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
interface DynamicTypeAheadProps extends InlineComponentProps {
    options?: any;
    type?: string;
}
export declare class DynamicTypeaheadComponent extends React.Component<DynamicTypeAheadProps, any> {
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUpdate(nextProps: any, nextState: any): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    getDynamicPayload: (query: string) => {};
    handleInputChange: (query: string, e: Event) => void;
    handleSearch: (query: string) => void;
    handleChange: (item: any) => void;
    handleBlurChange: () => void;
    getModalValue: (modelData: any) => any;
    getTitle: (modelData: any) => any;
    render(): JSX.Element;
}
export {};
