"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openModal = exports.fetchDynamicTypeaheadResults = exports.failureCustomModal = exports.putData = exports.successCustomModal = exports.deleteModel = exports.createOrModify = exports.searchModel = exports.bulkCreate = exports.fetchModel = exports.filterModel = exports.getMyDetails = void 0;
const FetchUtil_1 = require("./FetchUtil");
const queryString = require("query-string");
const apiServer = "https://api-dev.abrightlab.com/masterdata/v2";
function getMyDetails(success, error) {
    return (dispatch) => {
        dispatch({ type: "FETCH_USER_STARTED" });
        fetch(apiServer + "/auth/me", FetchUtil_1.FetchUtil.get()).then(FetchUtil_1.FetchUtil.parseResponse).then((data) => {
            dispatch({ type: "FETCH_USER_COMPLETED", myDetails: data });
            if (success)
                success(data);
        }).catch((err) => {
            if (err.name === "AuthError") {
                dispatch({ type: "AUTH_FAILED" });
                return;
            }
            console.log("Error while fetching user", err);
            dispatch({ type: "FETCH_USER_FAILURE", err: err });
            if (error)
                error(err);
        });
    };
}
exports.getMyDetails = getMyDetails;
function filterModel(model, item, success, error, queryParams) {
    return (dispatch) => {
        dispatch({ type: "FETCH_" + model + "_STARTED", model: model, item: item, isFilters: true });
        const modalQueryParams = queryString.parseUrl(model);
        const queryParamsString = queryString.stringify(Object.assign({}, modalQueryParams.query, queryParams));
        fetch(`${apiServer}/${modalQueryParams.url}/filter?${queryParamsString}`, FetchUtil_1.FetchUtil.post(item)).then(FetchUtil_1.FetchUtil.parseResponse).then((data) => {
            dispatch({ type: "FETCH_" + model + "_COMPLETED", data: { results: data.results ? data.results : data, metadata: data.metadata }, model: model });
            if (success)
                success(data.results ? data.results : data);
        }).catch((err) => {
            if (err.name === "AuthError") {
                dispatch({ type: "AUTH_FAILED" });
                return;
            }
            console.log("Error while fetching" + model, err);
            dispatch({ type: "FETCH_" + model + "_FAILURE", err: err, model: model });
            if (error)
                error(err);
        });
    };
}
exports.filterModel = filterModel;
function fetchModel(model, success, error, queryParams) {
    return (dispatch) => {
        dispatch({ type: "FETCH_" + model + "_STARTED", model: model });
        const modalQueryParams = queryString.parseUrl(model);
        const queryParamsString = queryString.stringify(Object.assign({}, modalQueryParams.query, queryParams));
        fetch(`${apiServer}/${modalQueryParams.url}?${queryParamsString}`, FetchUtil_1.FetchUtil.get()).then(FetchUtil_1.FetchUtil.parseResponse).then((data) => {
            dispatch({ type: "FETCH_" + model + "_COMPLETED", data: data.results ? data.results : data, model: model });
            if (success)
                success(data);
        }).catch((err) => {
            if (err.name === "AuthError") {
                dispatch({ type: "AUTH_FAILED" });
                return;
            }
            console.log("Error while fetching" + model, err);
            dispatch({ type: "FETCH_" + model + "_FAILURE", err: err, model: model });
            if (error)
                error(err);
        });
    };
}
exports.fetchModel = fetchModel;
function bulkCreate(model, csvUrl, success, error) {
    return (dispatch) => {
        dispatch({ type: "BULK_CREATE_" + model + "_STARTED", model: model });
        fetch(apiServer + "/" + model + "/bulkCreate", FetchUtil_1.FetchUtil.post({ csvUrl: csvUrl })).then(FetchUtil_1.FetchUtil.parseResponse).then((data) => {
            dispatch({ type: "BULK_CREATE_" + model + "_COMPLETED", data: data, model: model });
            if (success)
                success(data);
        }).catch((err) => {
            if (err.name === "AuthError") {
                return dispatch({ type: "AUTH_FAILED" });
            }
            dispatch({ type: "BULK_CREATE_" + model + "_FAILURE", err: err, model: model });
            if (error)
                error(err);
        });
    };
}
exports.bulkCreate = bulkCreate;
function searchModel(model, id, callback) {
    return (dispatch) => {
        fetch(`${apiServer}/${model}/${id}`, FetchUtil_1.FetchUtil.get()).then(FetchUtil_1.FetchUtil.parseResponse).then((data) => {
            if (callback)
                callback(data);
        }).catch((err) => {
            if (err.name === "AuthError") {
                dispatch({ type: "AUTH_FAILED" });
                return;
            }
            if (callback)
                callback(null);
        });
    };
}
exports.searchModel = searchModel;
function createOrModify(model, item, edit, success, error, queryParams) {
    return (dispatch) => {
        const word = edit ? "MODIFY" : "CREATE";
        dispatch({ type: word + "_" + model + "_STARTED", model: model });
        const modalQueryParams = queryString.parseUrl(model);
        const queryParamsString = queryString.stringify(Object.assign({}, modalQueryParams.query, queryParams));
        fetch(`${apiServer}/${modalQueryParams.url}?${queryParamsString}`, edit ? FetchUtil_1.FetchUtil.put(item) : FetchUtil_1.FetchUtil.post(item)).then(FetchUtil_1.FetchUtil.parseResponse).then((data) => {
            dispatch({ type: word + "_" + model + "_COMPLETED", data: data, model: model });
            if (success)
                success(data);
        }).catch((err) => {
            if (err.name === "AuthError") {
                dispatch({ type: "AUTH_FAILED" });
                return;
            }
            console.log("Error while fetching" + model, err);
            dispatch({ type: word + "_" + model + "_FAILURE", err: err, model: model });
            if (error)
                error(err);
        });
    };
}
exports.createOrModify = createOrModify;
function deleteModel(model, item, success, error, queryParams) {
    return (dispatch) => {
        dispatch({ type: "DELETE_" + model + "_STARTED", model: model });
        const modalQueryParams = queryString.parseUrl(model);
        const queryParamsString = queryString.stringify(Object.assign({}, modalQueryParams.query, queryParams));
        fetch(`${apiServer}/${modalQueryParams.url}?${queryParamsString}`, FetchUtil_1.FetchUtil.delete(item)).then(FetchUtil_1.FetchUtil.parseResponse).then((data) => {
            dispatch({ type: "DELETE_" + model + "_COMPLETED", data: data, model: model });
            if (success)
                success(data);
        }).catch((err) => {
            if (err.name === "AuthError") {
                dispatch({ type: "AUTH_FAILED" });
                return;
            }
            console.log("Error while deleting" + model, err);
            dispatch({ type: "DELETE_" + model + "_FAILURE", err: err, model: model });
            if (error)
                error(err);
        });
    };
}
exports.deleteModel = deleteModel;
function successCustomModal(data, type, model) {
    return (dispatch) => {
        dispatch({ data, type, model });
    };
}
exports.successCustomModal = successCustomModal;
function putData(data, model) {
    return (dispatch) => {
        dispatch({ data, type: "SET_MODAL_DATA", model });
    };
}
exports.putData = putData;
function failureCustomModal(err, model, type) {
    return (dispatch) => {
        dispatch({ type, err, model });
    };
}
exports.failureCustomModal = failureCustomModal;
const fetchDynamicTypeaheadResults = (model, item) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${apiServer}/${model}/filter`, FetchUtil_1.FetchUtil.post(item));
        return FetchUtil_1.FetchUtil.parseResponse(response);
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.fetchDynamicTypeaheadResults = fetchDynamicTypeaheadResults;
const openModal = (model, data) => __awaiter(void 0, void 0, void 0, function* () {
    return (dispatch) => {
        dispatch({ type: "OPEN_" + model + "_MODAL", model: model, data: data });
    };
});
exports.openModal = openModal;
//# sourceMappingURL=Actions.js.map