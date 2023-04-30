import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
export declare class DatePickerComponent extends React.Component<InlineComponentProps, any> {
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    render(): JSX.Element;
    handleIntervalChange: (event: any) => void;
    handleChange(selected: any): void;
}
