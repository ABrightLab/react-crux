import * as React from "react";
interface BulkCreateModalProps {
    createOrModify: any;
    constants: any;
    createOrEditSuccess: any;
    closeModal: any;
    showModal: any;
    additionalProps?: any;
}
interface BulkCreateModalState {
    syncUrl: string;
    error: any;
}
export declare class BulkCreateModal extends React.Component<BulkCreateModalProps, BulkCreateModalState> {
    constructor(props: any);
    createOrEditSuccess: (data: any) => void;
    createOrEditError: (err: any) => void;
    closeDeleteModal: () => void;
    closeModal: () => void;
    bulkCreate: () => void;
    syncUrl: (e: any) => void;
    render(): JSX.Element;
}
export default BulkCreateModal;
