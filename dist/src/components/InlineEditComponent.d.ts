import * as React from "react";
export declare class InlineEditComponent extends React.Component<any, any> {
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    render(): JSX.Element;
    startEditing(): void;
    stopEditing(): void;
    startLoading(): void;
    stopLoading(): void;
    handleChange(e: any): void;
    handleEnter(e: any): void;
    success(): void;
    error(err: any): void;
}
