"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CruxComponentCreator = exports.NestedEditComponent = exports.ModalComponent = void 0;
const React = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const Actions_1 = require("./Actions");
const lodash_1 = require("lodash");
const util_1 = require("./util");
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const react_bootstrap_1 = require("react-bootstrap");
const ModalComponent_1 = require("./components/ModalComponent");
const ListNestedComponent_1 = require("./components/ListNestedComponent");
const PaginationComponent_1 = require("./components/PaginationComponent");
const BulkCreatorModal_1 = require("./components/BulkCreatorModal");
var ModalComponent_2 = require("./components/ModalComponent");
Object.defineProperty(exports, "ModalComponent", { enumerable: true, get: function () { return ModalComponent_2.ModalComponent; } });
var NestedEditComponent_1 = require("./components/NestedEditComponent");
Object.defineProperty(exports, "NestedEditComponent", { enumerable: true, get: function () { return NestedEditComponent_1.NestedEditComponent; } });
class CruxComponentCreator {
    static create(constants) {
        function mapStateToProps(state, ownProps) {
            const additionalModels = (0, util_1.getAdditionalModels)(constants);
            const stateRoot = !constants.stateRoot ? "crux" : (constants.stateRoot === "none" ? undefined : constants.stateRoot);
            const additionalModelValues = (0, lodash_1.map)(additionalModels, (model) => {
                return { "modelName": model, "value": stateRoot ? state[stateRoot][model] : state[model] };
            });
            return Object.assign({}, {
                modalData: state.crux.modalData,
                [constants.modelName]: stateRoot ? state[stateRoot][constants.modelName] : state[constants.modelName],
                additionalModels: (0, lodash_1.reduce)(additionalModelValues, (sum, obj) => {
                    return Object.assign({}, sum, { [obj.modelName]: obj.value });
                }, {}),
                queryParams: ownProps && ownProps.options && ownProps.options.queryParams,
                additionalProps: ownProps && ownProps.options && ownProps.options.additionalProps
            });
        }
        const mapDispatchToProps = (dispatch) => {
            return {
                fetch: (model, success, error, queryParams) => {
                    dispatch((0, Actions_1.fetchModel)(model, success, error, queryParams));
                },
                filter: (model, item, success, error, queryParams) => {
                    dispatch((0, Actions_1.filterModel)(model, item, success, error, queryParams));
                },
                createOrModify: (model, item, edit, success, error, queryParams) => {
                    dispatch((0, Actions_1.createOrModify)(model, item, edit, success, error, queryParams));
                },
                putData: (data, model) => {
                    dispatch((0, Actions_1.putData)(data, model));
                },
                deleteModel: (model, item, success, error, queryParams) => {
                    dispatch((0, Actions_1.deleteModel)(model, item, success, error, queryParams));
                },
                successCustomModal: (data, type, model) => {
                    dispatch((0, Actions_1.successCustomModal)(data, type, model));
                },
                failureCustomModal: (err, model, type) => {
                    dispatch((0, Actions_1.failureCustomModal)(type, err, model));
                },
                searchModel: (model, id, success) => {
                    dispatch((0, Actions_1.searchModel)(model, id, success));
                },
                bulkCreate: (model, csvUrl, success, error) => {
                    dispatch((0, Actions_1.bulkCreate)(model, csvUrl, success, error));
                }
            };
        };
        let ListClass = class ListClass extends React.Component {
            constructor(props) {
                super(props);
                this.fetchModels = (props) => {
                    const additionalModels = (0, lodash_1.filter)((0, util_1.getAdditionalModels)(constants), (model) => this.checkAdditionalModel(model, props));
                    additionalModels && additionalModels.forEach((model) => this.fetchServerData(model, props));
                };
                this.getDefaultPageSize = () => {
                    return constants.paginate && constants.paginate.defaultPageSize || "";
                };
                this.showCreateModal = () => {
                    const { showCreateModalArray } = this.state;
                    showCreateModalArray.push({
                        constants: constants,
                        model: {},
                        additionalModels: this.props.additionalModels,
                        type: "CREATE"
                    });
                    this.setState({ showCreateModal: true, showModalComponent: true, showCreateModalArray });
                    (0, Actions_1.openModal)('ModalName', showCreateModalArray);
                };
                this.closeCreateModal = (index, constantsModal) => {
                    const { showCreateModalArray } = this.state;
                    showCreateModalArray.splice(index, 1);
                    let modelArray = showCreateModalArray.filter((arr) => arr.constants.modelName === constantsModal.modelName);
                    this.props.putData(modelArray, constantsModal.modelName);
                    this.setState({ showCreateModalArray });
                };
                this.closeEditModal = (index, constantsModal) => {
                    const { showCreateModalArray } = this.state;
                    showCreateModalArray.splice(index, 1);
                    let modelArray = showCreateModalArray.filter((arr) => arr.constants.modelName === constantsModal.modelName);
                    this.props.putData(modelArray, constantsModal.modelName);
                    this.setState({ showCreateModalArray });
                };
                this.showBulkCreateModal = () => {
                    this.setState({ showBulkCreateModal: true });
                };
                this.closeBulkCreateModal = () => {
                    this.setState({ showBulkCreateModal: false });
                };
                this.showEditModal = (model) => {
                    this.setState({ showEditModal: true, model });
                    const { showCreateModalArray } = this.state;
                    showCreateModalArray.push({
                        constants: constants,
                        model: model,
                        additionalModels: this.props.additionalModels,
                        type: "EDIT"
                    });
                    this.setState({ showModalComponent: true, showCreateModalArray });
                    (0, Actions_1.openModal)('ModalName', showCreateModalArray);
                };
                this.showCustomModal = (model) => {
                    this.setState({ showCustomModal: true, model });
                };
                this.closeCustomModal = () => {
                    this.setState({ showCustomModal: false, model: {} });
                };
                this.createOrEditSuccess = (data, index, constantsModal) => {
                    const constNew = constantsModal ? constantsModal : constants;
                    this.closeEditModal(index, constNew);
                    // this.closeCreateModal(index, constNew)
                    this.closeBulkCreateModal();
                    if (constNew.filterModal || constNew.paginate)
                        this.props.filter(constNew.modelName, this.state.filterModel, undefined, undefined, this.props.queryParams);
                    else
                        this.fetchModel(constNew.modelName);
                };
                this.getDisplayText = (value, field, index) => {
                };
                this.handleSearch = (e) => {
                    this.setState({ searchQuery: e.target.value });
                };
                this.handleFieldSearch = (field, searchQuery) => {
                    const filterModal = Object.assign({}, this.state.filterModel, { [field]: searchQuery });
                    if (searchQuery === "") {
                        this.props.filter(constants.modelName, filterModal, undefined, undefined, this.props.queryParams);
                    }
                    this.setState({ filterModel: filterModal });
                };
                this.handleSearchKeyPress = (event) => {
                    if (event.charCode === 13) {
                        this.fetchSearchResults();
                    }
                };
                this.fetchSearchResults = () => {
                    const newFilterModel = Object.assign({}, this.state.filterModel, { skip: 0, paginate: Object.assign({}, this.state.filterModel.paginate, { currentPage: 1 }) });
                    this.setState({
                        filterModel: newFilterModel
                    });
                    this.props.filter(constants.modelName, newFilterModel, undefined, undefined, this.props.queryParams);
                };
                const showCreateModal = [];
                if (props.modalData) {
                    for (const property in props.modalData) {
                        showCreateModal.push(...props.modalData[property]);
                    }
                }
                const editArray = showCreateModal.filter((modal) => modal.type === "EDIT");
                const createArray = showCreateModal.filter((modal) => modal.type === "CREATE");
                this.state = {
                    showCreateModal: createArray.length ? true : false,
                    showEditModal: editArray.length ? true : false,
                    showCreateModalArray: showCreateModal,
                    showModalComponent: false,
                    showFilterModal: false,
                    model: {},
                    showCustomModal: false,
                    filterModel: {
                        paginate: {
                            currentPage: 1,
                            currentPageSize: this.getDefaultPageSize()
                        },
                        limit: this.getDefaultPageSize(),
                        skip: 0
                    },
                    openCreateModal: false,
                    showBulkCreateModal: false
                };
            }
            componentDidMount() {
                this.fetchModels(this.props);
            }
            checkAdditionalModel(modelName, props) {
                if ((modelName === constants.modelName
                    && (constants.paginate || this.props.queryParams) ||
                    !Array.isArray(props.additionalModels[modelName]))) {
                    return true;
                }
                return (0, lodash_1.isEmpty)(props.additionalModels[modelName]);
            }
            fetchServerData(modelName, props) {
                if (modelName === constants.modelName) {
                    this.getDefaultPageSize() ?
                        props.filter(modelName, { limit: constants.paginate.defaultPageSize }, this.searchByQueryParams, undefined, props.queryParams)
                        : props.fetch(modelName, this.searchByQueryParams, undefined, props.queryParams);
                }
                else {
                    props.fetch(modelName, undefined, undefined, props.queryParams);
                }
            }
            searchByQueryParams(data) {
                if (this.props.location && this.props.location.search) {
                    const params = new URLSearchParams(this.props.location.search);
                    const searchId = params.get("id");
                    const searchField = params.get("field");
                    const mode = params.get("mode");
                    if (searchId && searchField) {
                        const searchData = data.filter((x) => x[searchField] === searchId);
                        if (searchData.length) {
                            this.setState({ showEditModal: true, model: searchData[0] });
                            const { showCreateModalArray } = this.state;
                            showCreateModalArray.push({
                                constants: constants,
                                model: searchData[0],
                                additionalModels: this.props.additionalModels,
                                type: "EDIT"
                            });
                            this.setState({ showModalComponent: true, showCreateModalArray });
                            (0, Actions_1.openModal)('ModalName', showCreateModalArray);
                        }
                        else {
                            this.props.searchModel(constants.modelName, searchId, (searchModel) => {
                                if (searchModel) {
                                    this.setState({ showEditModal: true, model: searchModel });
                                    const { showCreateModalArray } = this.state;
                                    showCreateModalArray.push({
                                        constants: constants,
                                        model: searchModel,
                                        additionalModels: this.props.additionalModels,
                                        type: "EDIT"
                                    });
                                    this.setState({ showModalComponent: true, showCreateModalArray });
                                    (0, Actions_1.openModal)('ModalName', showCreateModalArray);
                                }
                            });
                        }
                    }
                    else if (mode === "CREATE") {
                        this.showCreateModal();
                    }
                }
            }
            componentWillReceiveProps(nextProps) {
                if (!(0, lodash_1.isEqual)(this.props.queryParams, nextProps.queryParams)) {
                    this.fetchModels(nextProps);
                }
            }
            showFilterModal() {
                this.setState({ showFilterModal: true });
            }
            closeFilterModal() {
                this.setState({ showFilterModal: false });
            }
            resetFilter() {
                const baseFilterModal = {
                    paginate: {
                        currentPage: 1,
                        currentPageSize: this.getDefaultPageSize()
                    },
                    limit: this.getDefaultPageSize(),
                    skip: 0
                };
                this.setState({ filterModel: baseFilterModal });
                this.fetchModel(constants.modelName);
            }
            fetchModel(modelName) {
                modelName &&
                    this.getDefaultPageSize()
                    ? this.props.filter(modelName, { limit: constants.paginate.defaultPageSize }, this.searchByQueryParams, undefined, this.props.queryParams)
                    : this.props.fetch(modelName, this.searchByQueryParams, undefined, this.props.queryParams);
            }
            filterSuccess(data) {
                this.closeFilterModal();
            }
            inlineEdit(item, success, error) {
                this.props.createOrModify(constants.modelName, item, true, this.inlineEditSuccess.bind(this, success), this.inlineEditError.bind(this, error), this.props.queryParams);
            }
            inlineEditSuccess(success, data) {
                this.createOrEditSuccess(data);
                success && success(data);
            }
            inlineEditError(error, data) {
                error && error(data);
            }
            successCustomModalDispatch(data, type, model) {
                this.props.successCustomModal(data, type, model);
            }
            failureCustomModalDispatch(err, modelName, type) {
                this.props.failureCustomModal(err, modelName, type);
            }
            getCustomComponent() {
                const CustomComponent = constants.customModalComponent;
                return React.createElement(CustomComponent, Object.assign({ model: this.state.model, closeModal: this.closeCustomModal, sucessDispatch: this.successCustomModalDispatch, failureDispatch: this.failureCustomModalDispatch, additionalProps: this.props.additionalProps }, this.props));
            }
            previousPage() {
                const filterModelData = Object.assign({}, this.state.filterModel);
                const paginationData = Object.assign({}, this.state.filterModel.paginate);
                paginationData["currentPage"] -= 1;
                filterModelData["skip"] = (paginationData["currentPage"] - 1) * this.state.filterModel.limit +
                    (paginationData["currentPage"] - 1 === 0 ? 0 : 1);
                filterModelData["paginate"] = paginationData;
                this.setState({
                    filterModel: filterModelData
                });
                this.props.filter(constants.modelName, filterModelData, undefined, undefined, this.props.queryParams);
            }
            nextPage() {
                const filterModelData = Object.assign({}, this.state.filterModel);
                const paginationData = Object.assign({}, this.state.filterModel.paginate);
                paginationData["currentPage"] += 1;
                filterModelData["skip"] = this.state.filterModel.paginate.currentPage * this.state.filterModel.limit + 1;
                filterModelData["paginate"] = paginationData;
                this.setState({
                    filterModel: filterModelData
                });
                this.props.filter(constants.modelName, filterModelData, undefined, undefined, this.props.queryParams);
            }
            paginate(pageSize) {
                const filterModelData = Object.assign({}, this.state.filterModel);
                const paginationData = Object.assign({}, this.state.filterModel.paginate);
                paginationData["currentPageSize"] = pageSize;
                paginationData["currentPage"] = 1;
                filterModelData["paginate"] = paginationData;
                filterModelData["skip"] = 0;
                filterModelData["limit"] = pageSize;
                this.setState({ filterModel: filterModelData });
                this.props.filter(constants.modelName, filterModelData, undefined, undefined, this.props.queryParams);
            }
            getTableData() {
                return this.props[constants.modelName] && this.props[constants.modelName].results ? this.props[constants.modelName].results : this.props[constants.modelName];
            }
            render() {
                const rows = (0, lodash_1.isEmpty)(constants.orderby) ? this.getTableData() : (0, lodash_1.sortBy)(this.getTableData(), (doc) => {
                    return (0, lodash_1.trim)(doc[constants.orderby].toLowerCase());
                });
                let filteredRows = (!constants.enableSearch || (0, lodash_1.isEmpty)(this.state.searchQuery)) ? rows : (0, lodash_1.filter)(rows, (row) => JSON.stringify(row).toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1);
                (0, lodash_1.forEach)((0, lodash_1.filter)(constants.fields, (field) => field.search &&
                    field.search.filterLocation !== "server" &&
                    this.state.filterModel[field.search.key]), (field) => {
                    filteredRows = (0, lodash_1.filter)(filteredRows, (row) => !row[field.field] || JSON.stringify(row[field.field]).toLowerCase().indexOf(this.state.filterModel[field.search.key].toLowerCase()) !== -1);
                });
                if (this.props[constants.modelName] && this.props[constants.modelName].error) {
                    return React.createElement("div", { className: "cf-main-content-container", style: { width: "100%", padding: 10, overflowY: "scroll" } },
                        React.createElement(react_bootstrap_1.Alert, { bsStyle: "danger" }, "Error occured while fetching " + constants.title));
                }
                return (React.createElement("div", { className: "cf-main-content-container", style: { width: "100%", padding: 10, overflowY: "scroll" } },
                    constants.createModal && React.createElement("div", { className: "pull-right btn btn-primary btn-xs", onClick: this.showCreateModal }, "+ New " + constants.creationTitle),
                    constants.bulkCreateModal && React.createElement("div", { className: "pull-right btn btn-primary btn-xs", onClick: this.showBulkCreateModal }, "+ Bulk Create"),
                    constants.filterModal &&
                        React.createElement("div", { style: { marginRight: 10 }, className: "pull-right btn btn-primary btn-xs", onClick: this.showFilterModal }, "Filter " + constants.creationTitle),
                    constants.filterModal &&
                        React.createElement("div", { style: { marginRight: 10 }, className: "pull-right btn btn-primary btn-xs", onClick: this.resetFilter }, "Reset Filter "),
                    React.createElement("div", { className: "heading cf-container-header" }, constants.title),
                    constants.paginate && this.props[constants.modelName] && this.props[constants.modelName].metadata &&
                        React.createElement(PaginationComponent_1.PaginationComponent, { prev: this.previousPage, next: this.nextPage, paginate: this.paginate, metadata: this.props[constants.modelName].metadata, dataconstant: constants.paginate, item: this.state.filterModel }),
                    constants.enableSearch && React.createElement("div", null,
                        React.createElement(react_bootstrap_1.FormGroup, { style: { paddingTop: "10px" } },
                            React.createElement(react_bootstrap_1.FormControl, { type: "text", value: this.state.searchQuery, placeholder: "Search", onChange: this.handleSearch }))),
                    React.createElement("div", { style: { marginTop: "10px" } }),
                    React.createElement(react_bootstrap_1.Table, { className: "table table-striped cftable", striped: true, bordered: true, condensed: true, hover: true, responsive: true },
                        React.createElement("thead", null,
                            React.createElement("tr", { key: "header" },
                                constants.fields.filter((field) => field.display).map((field, index) => React.createElement("th", { key: field + index }, field.title)),
                                constants.editModal && React.createElement("th", null),
                                constants.customModal && React.createElement("th", null))),
                        React.createElement("tbody", null,
                            constants.fields.some((field) => field.search) &&
                                React.createElement("tr", { key: "searchRow" },
                                    (0, lodash_1.map)((0, lodash_1.filter)(constants.fields, (field) => field.display === true), (field, i) => (React.createElement("td", { key: "search" + field.field + i, style: (field.cellCss) ? field.cellCss : { margin: "0px" } }, field.search && field.search.filterLocation === "server" &&
                                        React.createElement("div", { style: { display: "flex" } },
                                            React.createElement("div", { style: { display: "inline-block", width: "80%" } },
                                                React.createElement("input", { type: "text", style: { width: "100%" }, value: this.state.filterModel && this.state.filterModel[field.search.key] || "", onKeyPress: this.handleSearchKeyPress, onChange: (e) => this.handleFieldSearch(field.search.key, e.target.value) })),
                                            React.createElement("button", { style: { marginLeft: "10px", color: "grey", height: 30 }, className: "glyphicon glyphicon-search", "aria-hidden": "true", onClick: this.fetchSearchResults }))))),
                                    constants.editModal && React.createElement("td", null),
                                    constants.customModal && React.createElement("td", null)),
                            (0, lodash_1.map)(filteredRows, (model, index) => {
                                const filtered = constants.fields.filter((field) => field.display === true);
                                const rowKey = model._id || "";
                                return React.createElement("tr", { key: rowKey + index },
                                    (0, lodash_1.map)(filtered, (field, i) => {
                                        return React.createElement("td", { key: rowKey + field.field + i, style: (field.cellCss) ? field.cellCss : { margin: "0px" } },
                                            React.createElement("div", { style: { marginTop: 8 } },
                                                React.createElement(ListNestedComponent_1.ListNestedComponent, { field: field, model: model, additionalModels: this.props.additionalModels, modelChanged: this.inlineEdit, additionalProps: this.props.additionalProps })));
                                    }),
                                    constants.editModal &&
                                        React.createElement("td", { key: rowKey + "edit" },
                                            React.createElement("span", { style: { margin: 8, color: "grey", cursor: "pointer" }, className: "glyphicon glyphicon-pencil fas fa-pencil-alt", "aria-hidden": "true", onClick: () => this.showEditModal(model) })),
                                    constants.customModal &&
                                        React.createElement("td", { key: rowKey + "custom" },
                                            React.createElement("span", { style: { margin: 8, color: "grey", cursor: "pointer" }, className: constants.customModalIcon || "glyphicon glyphicon-duplicate", "aria-hidden": "true", onClick: () => this.showCustomModal(model) })));
                            }))),
                    React.createElement("div", { style: {
                            position: 'fixed',
                            bottom: 0
                        } },
                        constants.createModal && this.state.showCreateModal &&
                            this.state.showCreateModalArray.map((item, index) => (item.type === "CREATE" ? React.createElement(ModalComponent_1.ModalComponent, { constants: item.constants, setValueInArray: (index, value) => {
                                    let { showCreateModalArray } = this.state;
                                    showCreateModalArray[index] = {
                                        model: value,
                                        constants: item.constants,
                                        additionalModels: item.additionalModels,
                                        type: "CREATE"
                                    };
                                    let modelArray = showCreateModalArray.filter((arr) => arr.constants.modelName === item.constants.modelName);
                                    this.props.putData(modelArray, item.constants.modelName);
                                    this.setState({
                                        showCreateModalArray
                                    });
                                }, showModal: this.state.showCreateModal, showMinimize: true, showModalComponent: this.state.showModalComponent, closeModal: (modalIndex) => this.closeCreateModal(modalIndex, item.constants), modalIndex: index, item: item.model, modalType: "CREATE", createOrModify: this.props.createOrModify, createOrEditSuccess: (index, data) => this.createOrEditSuccess(data, index, item.constants), additionalModels: item.additionalModels, queryParams: this.props.queryParams, additionalProps: this.props.additionalProps }) : null)),
                        constants.bulkCreateModal && this.state.showBulkCreateModal &&
                            React.createElement(BulkCreatorModal_1.BulkCreateModal, { constants: constants, showModal: this.state.showBulkCreateModal, closeModal: this.closeBulkCreateModal, createOrModify: this.props.bulkCreate, createOrEditSuccess: this.createOrEditSuccess, additionalProps: this.props.additionalProps }),
                        constants.editModal && this.state.showEditModal &&
                            this.state.showCreateModalArray.map((item, index) => (item.type === "EDIT" ? React.createElement(ModalComponent_1.ModalComponent, { constants: item.constants, showModal: this.state.showEditModal, closeModal: () => this.closeEditModal(index, item.constants), modalType: "EDIT", showMinimize: true, showModalComponent: this.state.showModalComponent, setValueInArray: (index, value) => {
                                    let { showCreateModalArray } = this.state;
                                    showCreateModalArray[index] = {
                                        model: value,
                                        constants: item.constants,
                                        additionalModels: item.additionalModels,
                                        type: "EDIT",
                                    };
                                    let modelArray = showCreateModalArray.filter((arr) => arr.constants.modelName === item.constants.modelName);
                                    this.props.putData(modelArray, item.constants.modelName);
                                    this.setState({
                                        showCreateModalArray
                                    });
                                }, fetch: (model) => this.props.fetch(model), item: item.model, modalIndex: index, createOrModify: this.props.createOrModify, createOrEditSuccess: (index, data) => this.createOrEditSuccess(data, index, item.constants), deleteModel: constants.deleteModal === false ? undefined : this.props.deleteModel, additionalModels: item.additionalModels, queryParams: this.props.queryParams, additionalProps: this.props.additionalProps }) : null)),
                        constants.filterModal && this.state.showFilterModal &&
                            React.createElement(ModalComponent_1.ModalComponent, { constants: constants, showModal: this.state.showFilterModal, closeModal: this.closeFilterModal, modalType: "FILTER", item: this.state.filterModel, filterSuccess: this.filterSuccess, filter: this.props.filter, additionalModels: this.props.additionalModels, queryParams: this.props.queryParams, additionalProps: this.props.additionalProps }),
                        constants.customModal && this.state.showCustomModal &&
                            this.getCustomComponent())));
            }
        };
        ListClass = __decorate([
            autobind_decorator_1.default
        ], ListClass);
        return (0, react_redux_1.connect)(mapStateToProps, mapDispatchToProps)(ListClass);
    }
}
exports.CruxComponentCreator = CruxComponentCreator;
//# sourceMappingURL=CruxComponent.js.map