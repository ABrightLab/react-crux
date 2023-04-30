import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
export declare class TimezoneComponent extends React.Component<InlineComponentProps, any> {
    constructor(props: any);
    render(): JSX.Element;
    handleTimezoneChange: (timezone: string) => void;
}
