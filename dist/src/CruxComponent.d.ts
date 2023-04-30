export declare type ModalType = "CREATE" | "EDIT" | "FILTER" | "CUSTOM" | "BULK_CREATE";
export interface InlineComponentProps {
    field: any;
    modelChanged: any;
    additionalModels: any;
    currentModel: any;
    fetch?: any;
    indent?: boolean;
    showTitle?: boolean;
    modalType?: ModalType;
    width?: string;
    height?: string;
    contentType?: string;
    item?: any;
    parentModel: any;
    shouldRender?: boolean;
    urlPrefix?: string;
    urlSuffix?: string;
    constants?: any;
    anchors?: any;
    readonly?: boolean;
    nullable?: boolean;
    collapsable?: boolean;
    collapsed?: boolean;
    expandable?: boolean;
    isMulti?: boolean;
    index?: number;
    style?: any;
    iterableNested?: boolean;
    nestedIterableModelChanged?: any;
    additionalProps?: any;
    dynamicFileNameFn?: any;
}
export { ModalComponent } from "./components/ModalComponent";
export { NestedEditComponent } from "./components/NestedEditComponent";
export declare class CruxComponentCreator {
    static create<M, P>(constants: any): any;
}
