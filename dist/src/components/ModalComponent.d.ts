import * as React from "react";
import { ModalType } from "../CruxComponent";
interface ModalComponentProps {
    constants: any;
    showModal: boolean;
    closeModal: any;
    modalIndex?: any;
    modalType: ModalType;
    fetch?: any;
    item?: any;
    createOrModify?: any;
    createOrEditSuccess?: any;
    deleteModel?: any;
    filterSuccess?: any;
    filter?: any;
    additionalModels: any[];
    successButtonLabel?: string;
    queryParams: any;
    additionalProps?: any;
    setValueInArray?: any;
    showModalComponent?: boolean;
    showMinimize?: boolean;
}
export declare class ModalComponent extends React.Component<ModalComponentProps, any> {
    private modalBodyRef;
    constructor(props: any);
    getRepField: () => any;
    getInitialState(): {
        item: any;
        deleteModal: boolean;
    };
    modalPerformOperation(modalType: ModalType, edit: boolean): () => void;
    createOrEditSuccess: (data: any) => void;
    filterSuccess(data: any): void;
    filterError(err: any): void;
    createOrEditError: (err: any) => void;
    closeModal: () => void;
    modelChanged: (value: any) => void;
    openDeleteModal: () => void;
    closeDeleteModal: () => void;
    deleteModel: () => void;
    validateItem(data: any, schema: any): boolean;
    render(): JSX.Element[];
}
export {};
