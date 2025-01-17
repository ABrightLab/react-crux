import { Dispatch } from "redux"
import { FetchUtil } from "./FetchUtil"

const queryString = require("query-string")

const apiServer = "https://api-dev.abrightlab.com/masterdata/v2"

export function getMyDetails(success?: any, error?: any) {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: "FETCH_USER_STARTED" })
        fetch(apiServer + "/auth/me", FetchUtil.get()).then(FetchUtil.parseResponse).then((data: any) => {
            dispatch({ type: "FETCH_USER_COMPLETED", myDetails: data })
            if (success) success(data)
        }).catch((err: any) => {
            if (err.name === "AuthError") {
                dispatch({ type: "AUTH_FAILED" })
                return
            }
            console.log("Error while fetching user", err)
            dispatch({ type: "FETCH_USER_FAILURE", err: err })
            if (error) error(err)
        })
    }
}

export function filterModel(model: string, item: any, success?: any, error?: any, queryParams?: any) {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: "FETCH_" + model + "_STARTED", model: model, item: item, isFilters: true })
        const modalQueryParams = queryString.parseUrl(model)
        const queryParamsString = queryString.stringify(Object.assign({}, modalQueryParams.query, queryParams))
        fetch(`${apiServer}/${modalQueryParams.url}/filter?${queryParamsString}`, FetchUtil.post(item)).then(FetchUtil.parseResponse).then((data: any) => {
            dispatch({ type: "FETCH_" + model + "_COMPLETED", data: { results: data.results ? data.results : data, metadata: data.metadata }, model: model })
            if (success) success(data.results ? data.results : data)
        }).catch((err: any) => {
            if (err.name === "AuthError") {
                dispatch({ type: "AUTH_FAILED" })
                return
            }
            console.log("Error while fetching" + model, err)
            dispatch({ type: "FETCH_" + model + "_FAILURE", err: err, model: model })
            if (error) error(err)
        })
    }
}

export function fetchModel(model: string, success?: any, error?: any, queryParams?: any) {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: "FETCH_" + model + "_STARTED", model: model })
        const modalQueryParams = queryString.parseUrl(model)
        const queryParamsString = queryString.stringify(Object.assign({}, modalQueryParams.query, queryParams))
        fetch(`${apiServer}/${modalQueryParams.url}?${queryParamsString}`, FetchUtil.get()).then(FetchUtil.parseResponse).then((data: any) => {
            dispatch({ type: "FETCH_" + model + "_COMPLETED", data: data.results ? data.results : data, model: model })
            if (success) success(data)
        }).catch((err: any) => {
            if (err.name === "AuthError") {
                dispatch({ type: "AUTH_FAILED" })
                return
            }
            console.log("Error while fetching" + model, err)
            dispatch({ type: "FETCH_" + model + "_FAILURE", err: err, model: model })
            if (error) error(err)
        })
    }
}

export function bulkCreate(model: string, csvUrl: string, success?: any, error?: any) {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: "BULK_CREATE_" + model + "_STARTED", model: model })
        fetch(apiServer+"/" + model + "/bulkCreate", FetchUtil.post({ csvUrl: csvUrl })).then(FetchUtil.parseResponse).then((data: any) => {
            dispatch({ type: "BULK_CREATE_" + model + "_COMPLETED", data: data, model: model })
            if (success) success(data)
        }).catch((err: any) => {
            if (err.name === "AuthError") {
                return dispatch({ type: "AUTH_FAILED" })
            }
            dispatch({ type: "BULK_CREATE_" + model + "_FAILURE", err: err, model: model })
            if (error) error(err)
        })
    }
}

export function searchModel(model: string, id: string, callback: any) {
    return (dispatch: Dispatch<any>) => {
        fetch(`${apiServer}/${model}/${id}`, FetchUtil.get()).then(FetchUtil.parseResponse).then((data: any) => {
            if (callback) callback(data)
        }).catch((err: any) => {
            if (err.name === "AuthError") {
                dispatch({ type: "AUTH_FAILED" })
                return
            }
            if (callback) callback(null)
        })
    }
}

export function createOrModify(model: string, item: any, edit: boolean, success?: any, error?: any, queryParams?: any) {
    return (dispatch: Dispatch<any>) => {
        const word = edit ? "MODIFY" : "CREATE"
        dispatch({ type: word + "_" + model + "_STARTED", model: model })
        const modalQueryParams = queryString.parseUrl(model)
        const queryParamsString = queryString.stringify(Object.assign({}, modalQueryParams.query, queryParams))
        fetch(`${apiServer}/${modalQueryParams.url}?${queryParamsString}`, edit ? FetchUtil.put(item) : FetchUtil.post(item)).then(FetchUtil.parseResponse).then((data: any) => {
            dispatch({ type: word + "_" + model + "_COMPLETED", data: data, model: model })
            if (success) success(data)
        }).catch((err: any) => {
            if (err.name === "AuthError") {
                dispatch({ type: "AUTH_FAILED" })
                return
            }
            console.log("Error while fetching" + model, err)
            dispatch({ type: word + "_" + model + "_FAILURE", err: err, model: model })
            if (error) error(err)
        })
    }
}

export function deleteModel(model: string, item: any, success?: any, error?: any, queryParams?: any) {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: "DELETE_" + model + "_STARTED", model: model })
        const modalQueryParams = queryString.parseUrl(model)
        const queryParamsString = queryString.stringify(Object.assign({}, modalQueryParams.query, queryParams))
        fetch(`${apiServer}/${modalQueryParams.url}?${queryParamsString}`, FetchUtil.delete(item)).then(FetchUtil.parseResponse).then((data: any) => {
            dispatch({ type: "DELETE_" + model + "_COMPLETED", data: data, model: model })
            if (success) success(data)
        }).catch((err: any) => {
            if (err.name === "AuthError") {
                dispatch({ type: "AUTH_FAILED" })
                return
            }
            console.log("Error while deleting" + model, err)
            dispatch({ type: "DELETE_" + model + "_FAILURE", err: err, model: model })
            if (error) error(err)
        })
    }
}

export function successCustomModal(data: any, type: string, model: string) {
    return (dispatch: Dispatch<any>) => {
        dispatch({ data, type, model })
    }
}

export function putData(data: any, model: string) {
    return (dispatch: Dispatch<any>) => {
        dispatch({ data, type: "SET_MODAL_DATA", model })
    }
}

export function failureCustomModal(err: any, model: string, type: string) {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type, err, model })
    }
}

export const fetchDynamicTypeaheadResults = async (model: string, item: any) => {
    try {
        const response = await fetch(`${apiServer}/${model}/filter`, FetchUtil.post(item))
        return FetchUtil.parseResponse(response)
    }
    catch (err) {
        throw new Error(err.message)
    }
}


export const openModal = async (model: string, data: any) => {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: "OPEN_" + model + "_MODAL", model: model, data: data })
    }
}