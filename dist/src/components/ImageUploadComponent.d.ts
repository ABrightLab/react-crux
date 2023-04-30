import * as React from "react";
import { InlineComponentProps } from "../CruxComponent";
export declare class ImageUploadComponent extends React.Component<InlineComponentProps, any> {
    constructor(props: any);
    onDrop(files: any, width: string, height: string, contentType: string): void;
    removeFile: () => void;
    previewUpload: () => JSX.Element;
    render(): JSX.Element;
    getUrl(url: string, field: any): string;
    handleImageClick(event: any): void;
}
