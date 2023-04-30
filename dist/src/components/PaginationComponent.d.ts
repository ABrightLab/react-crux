import * as React from "react";
interface PaginationComponentProps {
    prev: any;
    next: any;
    paginate: any;
    metadata: any;
    dataconstant: any;
    item: any;
}
export declare class PaginationComponent extends React.Component<PaginationComponentProps, any> {
    pageSelectField: {
        style: {
            hideLabel: boolean;
        };
        foreign: {
            modelName: string;
            key: string;
            title: string;
        };
    };
    render(): JSX.Element;
    getPageSizes(): any;
    handlePageSelect(field: any, pageSize: string): void;
    isNextDisabled(): boolean;
    isPrevDisabled(): boolean;
    getPageNumber(): string;
}
export {};
