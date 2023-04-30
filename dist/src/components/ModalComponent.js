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
exports.ModalComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const lodash_1 = require("lodash");
const react_bootstrap_1 = require("react-bootstrap");
const ReactDOM = __importStar(require("react-dom"));
const NestedEditModalComponent_1 = require("./NestedEditModalComponent");
let ModalComponent = class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getRepField = () => {
            const repField = this.props.constants.fields.find((field) => field.representative);
            if (!repField) {
                console.error("Did you forget to add the representative tag at the top level.");
            }
            return repField;
        };
        this.createOrEditSuccess = (data) => {
            this.setState({ requestInProgress: false });
            this.props.createOrEditSuccess(this.props.modalIndex);
        };
        this.createOrEditError = (err) => {
            this.setState({ error: err, requestInProgress: false });
            this.closeDeleteModal();
            if (this.modalBodyRef) {
                this.modalBodyRef.scrollTop = 0;
            }
        };
        this.closeModal = () => {
            this.setState({ error: undefined });
            this.props.closeModal(this.props.modalIndex);
        };
        this.modelChanged = (value) => {
            this.setState((prevState) => {
                return { item: Object.assign({}, prevState.item, value) };
            });
        };
        this.openDeleteModal = () => {
            this.setState({ deleteModal: true });
        };
        this.closeDeleteModal = () => {
            this.setState({ deleteModal: false });
        };
        this.deleteModel = () => {
            this.props.deleteModel(this.props.constants.modelName, this.state.item, this.createOrEditSuccess, this.createOrEditError, this.props.queryParams);
        };
        this.state = {
            item: this.props.item || {},
            deleteModal: false,
            showModal: props.showModalComponent === false ? false : true
        };
    }
    getInitialState() {
        return {
            item: this.props.modalType === "CREATE" ? {} : this.props.item,
            deleteModal: false
        };
    }
    modalPerformOperation(modalType, edit) {
        return () => {
            this.setState({ requestInProgress: true });
            if (modalType === "FILTER") {
                const newItem = Object.assign({}, this.state.item, { skip: 0, paginate: Object.assign({}, this.state.item.paginate, { currentPage: 1 }) });
                // Copies the filter items to persist the preference
                Object.assign(this.props.item, newItem);
                this.props.filter(this.props.constants.modelName, newItem, this.filterSuccess, this.filterError, this.props.queryParams);
            }
            else if (modalType === "CREATE" || modalType === "EDIT" || modalType === "CUSTOM") {
                try {
                    this.validateItem(this.state.item, this.props.constants);
                }
                catch (e) {
                    this.createOrEditError(e);
                    return;
                }
                this.props.createOrModify(this.props.constants.modelName, this.state.item, edit, this.createOrEditSuccess, this.createOrEditError, this.props.queryParams);
            }
        };
    }
    filterSuccess(data) {
        this.setState({ requestInProgress: false });
        this.props.filterSuccess();
    }
    filterError(err) {
        this.setState({ error: err, requestInProgress: false });
    }
    validateItem(data, schema) {
        var _a, _b, _c, _d, _e, _f;
        for (const field of (_a = schema.fields) !== null && _a !== void 0 ? _a : []) {
            if (field.required === true) {
                if (!data) {
                    throw new Error(`${(_b = schema.title) !== null && _b !== void 0 ? _b : schema.field} is required as "${(_c = field.title) !== null && _c !== void 0 ? _c : field.field}" is a required field`);
                }
                else if (field.type === "nested" && (!(0, lodash_1.isObject)(data[field.field]) || (0, lodash_1.isEmpty)(data[field.field]))) {
                    throw new Error(`${(_d = field.title) !== null && _d !== void 0 ? _d : field.field} is a required field`);
                }
                else if (field.type === "iterable" && (!(0, lodash_1.isArray)(data[field.field]) || data[field.field].length === 0)) {
                    throw new Error(`${(_e = field.title) !== null && _e !== void 0 ? _e : field.field} is a required field`);
                }
                else if ((0, lodash_1.isNil)(data[field.field])) {
                    throw new Error(`${(_f = field.title) !== null && _f !== void 0 ? _f : field.field} is a required field`);
                }
                if (field.type === "nested" && data) {
                    return this.validateItem(data[field.field], field);
                }
                else if (field.type === "iterable" && data && data[field.field] && data[field.field].length > 0) {
                    for (const x of data[field.field]) {
                        this.validateItem(x, field.iterabletype);
                    }
                }
            }
        }
        return true;
    }
    render() {
        let errorType, errorMessage;
        if (this.state.error && !(0, lodash_1.isEmpty)(this.state.error.message)) {
            try {
                const error = JSON.parse(this.state.error.message);
                errorType = error.type;
                errorMessage = error.message || error.error.message;
            }
            catch (error) {
                errorMessage = this.state.error.message;
            }
        }
        const { requestInProgress } = this.state;
        const errorClassName = this.state.error ? "error-animate" : "";
        return this.props.showModal ? [
            React.createElement(react_bootstrap_1.Modal, { show: this.state.showModal, onHide: this.closeModal, container: this, "aria-labelledby": "contained-modal-title", backdrop: this.props.constants.disableModalOutsideClick ? "static" : true, dialogClassName: this.props.constants.largeEdit ? `${errorClassName} large-modal` : `${errorClassName}` },
                React.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                    this.props.modalType === "CREATE" &&
                        React.createElement(react_bootstrap_1.Modal.Title, { id: "contained-modal-title" }, "+ New " + this.props.constants.creationTitle),
                    this.props.modalType === "EDIT" && React.createElement(react_bootstrap_1.Modal.Title, { id: "contained-modal-title" }, "Edit " + this.props.constants.creationTitle + " - " + this.props.item[this.getRepField().field]),
                    this.props.modalType === "FILTER" &&
                        React.createElement(react_bootstrap_1.Modal.Title, { id: "contained-modal-title" }, "Filter " + this.props.constants.creationTitle),
                    this.props.modalType === "CUSTOM" &&
                        React.createElement(react_bootstrap_1.Modal.Title, { id: "contained-modal-title" }, "Custom " + this.props.constants.creationTitle + " - " + this.props.item[this.getRepField().field]),
                    this.props.showMinimize ? React.createElement("div", { className: "minimise_icon", onClick: () => {
                            this.props.setValueInArray ? this.props.setValueInArray(this.props.modalIndex, this.state.item) : null;
                            this.setState({ showModal: false });
                        } }, "-") : null),
                React.createElement(react_bootstrap_1.Modal.Body, { ref: reactComponent => this.modalBodyRef = ReactDOM.findDOMNode(reactComponent), className: "modal-height" },
                    this.state.error &&
                        React.createElement(react_bootstrap_1.Alert, { bsStyle: "danger" }, React.createElement("div", null,
                            errorType && React.createElement("b", null, errorType),
                            errorMessage && React.createElement("div", null, errorMessage))),
                    React.createElement(NestedEditModalComponent_1.NestedEditModalComponent, { field: this.props.constants, modalType: this.props.modalType, readonly: this.props.modalType !== "CREATE" && this.props.constants.readonly === true, additionalModels: this.props.additionalModels, fetch: this.props.fetch, modelChanged: this.modelChanged, currentModel: this.state.item, additionalProps: this.props.additionalProps, showTitle: false, expandable: false, collapsable: true, collapsed: false, nullable: true, parentModel: {} })),
                React.createElement(react_bootstrap_1.Modal.Footer, null,
                    this.props.deleteModel && this.props.modalType === "EDIT" &&
                        React.createElement("div", { className: "btn btn-danger", style: { float: "left" }, onClick: this.openDeleteModal }, "Delete"),
                    this.state.deleteModal &&
                        React.createElement(react_bootstrap_1.Modal, { show: this.state.deleteModal, onHide: this.closeDeleteModal, container: this },
                            React.createElement(react_bootstrap_1.Modal.Header, { closeButton: true }, "Delete " + this.props.constants.creationTitle),
                            React.createElement(react_bootstrap_1.Modal.Body, null, "Are you sure you want to delete " + this.props.item[this.getRepField().field] + " ?"),
                            React.createElement(react_bootstrap_1.Modal.Footer, null,
                                React.createElement("div", { className: "btn btn-danger", onClick: this.deleteModel }, "Delete"),
                                React.createElement("div", { className: "btn btn-secondary", onClick: this.closeDeleteModal }, "Cancel"))),
                    this.props.modalType === "EDIT" ?
                        React.createElement(React.Fragment, null,
                            React.createElement("button", { disabled: requestInProgress, className: "btn btn-primary", onClick: this.modalPerformOperation(this.props.modalType, true) }, "Update"),
                            this.props.constants.saveAsNew &&
                                React.createElement("button", { disabled: requestInProgress, className: "btn btn-primary", onClick: this.modalPerformOperation(this.props.modalType, false) }, "Save as New")) : null,
                    this.props.modalType === "CREATE" || this.props.modalType === "CUSTOM" ? (React.createElement("button", { disabled: requestInProgress, className: "btn btn-primary", onClick: this.modalPerformOperation(this.props.modalType, false) }, this.props.successButtonLabel || "Create")) : null,
                    this.props.modalType === "FILTER" ? (React.createElement("button", { disabled: requestInProgress, className: "btn btn-primary", onClick: this.modalPerformOperation(this.props.modalType, false) }, "Filter")) : null,
                    React.createElement("button", { disabled: requestInProgress, className: "btn btn-secondary", onClick: this.closeModal }, "Cancel"))),
            !this.state.showModal ? React.createElement("div", { onClick: () => {
                    this.setState({ showModal: true });
                }, className: "bottomTabsCss" },
                this.props.constants.creationTitle,
                " - ",
                this.state.item ? this.state.item[this.getRepField().field] : "",
                React.createElement("img", { src: "https://cdn2.iconfinder.com/data/icons/lucid-generic/24/expand_maximise_send_transfer_share-512.png", style: {
                        width: 20,
                        marginLeft: 20
                    } })) : null
        ] : null;
    }
};
ModalComponent = __decorate([
    autobind_decorator_1.default
], ModalComponent);
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=ModalComponent.js.map