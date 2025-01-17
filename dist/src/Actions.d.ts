import { Dispatch } from "redux";
export declare function getMyDetails(success?: any, error?: any): (dispatch: Dispatch<any>) => void;
export declare function filterModel(model: string, item: any, success?: any, error?: any, queryParams?: any): (dispatch: Dispatch<any>) => void;
export declare function fetchModel(model: string, success?: any, error?: any, queryParams?: any): (dispatch: Dispatch<any>) => void;
export declare function bulkCreate(model: string, csvUrl: string, success?: any, error?: any): (dispatch: Dispatch<any>) => void;
export declare function searchModel(model: string, id: string, callback: any): (dispatch: Dispatch<any>) => void;
export declare function createOrModify(model: string, item: any, edit: boolean, success?: any, error?: any, queryParams?: any): (dispatch: Dispatch<any>) => void;
export declare function deleteModel(model: string, item: any, success?: any, error?: any, queryParams?: any): (dispatch: Dispatch<any>) => void;
export declare function successCustomModal(data: any, type: string, model: string): (dispatch: Dispatch<any>) => void;
export declare function putData(data: any, model: string): (dispatch: Dispatch<any>) => void;
export declare function failureCustomModal(err: any, model: string, type: string): (dispatch: Dispatch<any>) => void;
export declare const fetchDynamicTypeaheadResults: (model: string, item: any) => Promise<unknown>;
export declare const openModal: (model: string, data: any) => Promise<(dispatch: Dispatch<any>) => void>;
