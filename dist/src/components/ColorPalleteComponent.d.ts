import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
export declare class ColorPalleteComponent extends React.Component<InlineComponentProps, any> {
    constructor(props: any);
    handleClick: () => void;
    handleClose: () => void;
    handleColorChange: (color: any) => void;
    componentDidMount(): void;
    convertHex(hex: string, opacity: number): string;
    render(): JSX.Element;
}
