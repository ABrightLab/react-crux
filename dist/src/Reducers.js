"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CruxReducerFactory = void 0;
const lodash_1 = require("lodash");
function CruxReducerFactory(defaultModels) {
    return function CruxReducer(initialState = defaultModels, action) {
        if (action.model) {
            if (action.type.startsWith("FETCH_")) {
                if (action.isFilters) {
                    const modelFilters = [action.model] + "AppliedFilters";
                    initialState = Object.assign({}, initialState, { [modelFilters]: action.item });
                }
                if (action.type.endsWith("_STARTED")) {
                    if ((0, lodash_1.isEmpty)(initialState[action.model])) {
                        return Object.assign({}, initialState, { [action.model]: [], fetchComplete: false });
                    }
                    else {
                        return Object.assign({}, initialState, { fetchComplete: false });
                    }
                }
                // dispatch({ type: "FETCH_" + model + "_PUT_DATA", data: { results: data.results ? data.results : data, metadata: data.metadata }, model: model })
                // It can be used, when New Data Comes in. It will be concated with existing props
                if (action.type.endsWith("_PUT_DATA")) {
                    const data = (0, lodash_1.cloneDeep)(initialState[action.model]);
                    if (data.results) {
                        data.results.unshift(action.data);
                    }
                    else {
                        data.unshift(action.data);
                    }
                    return Object.assign({}, initialState, { [action.model]: data, fetchComplete: true });
                }
                if (action.type.endsWith("_COMPLETED")) {
                    return Object.assign({}, initialState, { [action.model]: action.data, fetchComplete: true });
                }
                if (action.type.endsWith("_FAILURE")) {
                    return Object.assign({}, initialState, { [action.model]: { error: action.err }, fetchComplete: true });
                }
            }
            if (action.type.endsWith("OPEN_")) {
                return Object.assign({}, initialState, { [action.model]: action.data });
            }
            if (action.type === "SET_MODAL_DATA") {
                const newState = Object.assign(Object.assign({}, initialState), { modalData: Object.assign(Object.assign({}, initialState.modalData), { [action.model]: action.data }) });
                return newState;
            }
        }
        return Object.assign({}, initialState);
    };
}
exports.CruxReducerFactory = CruxReducerFactory;
//# sourceMappingURL=Reducers.js.map