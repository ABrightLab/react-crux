import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
export declare class DateTimezoneComponent extends React.Component<InlineComponentProps, any> {
    constructor(props: any);
    render(): JSX.Element;
    handleChange: (selected: any) => void;
    handleTimezoneChange: (field: any, timezone: string) => void;
}
