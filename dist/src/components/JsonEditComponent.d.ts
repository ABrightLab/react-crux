import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
import { InteractionProps } from "react-json-view";
export declare class JsonEditComponent extends React.Component<InlineComponentProps, any> {
    constructor(props: any);
    render(): JSX.Element;
    handleModify: (addPayload: InteractionProps) => boolean;
}
