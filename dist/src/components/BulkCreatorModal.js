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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkCreateModal = void 0;
const lodash_1 = require("lodash");
const React = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
class BulkCreateModal extends React.Component {
    constructor(props) {
        super(props);
        this.createOrEditSuccess = (data) => {
            this.props.createOrEditSuccess();
        };
        this.createOrEditError = (err) => {
            this.setState(Object.assign({}, this.state, { error: err }));
            this.closeDeleteModal();
        };
        this.closeDeleteModal = () => {
            this.setState(Object.assign({}, this.state, { deleteModal: false }));
        };
        this.closeModal = () => {
            this.setState(Object.assign({}, this.state, (0, lodash_1.omit)(this.state, "error")));
            this.props.closeModal();
        };
        this.bulkCreate = () => {
            this.props.createOrModify(this.props.constants.modelName, this.state.syncUrl, this.createOrEditSuccess, this.createOrEditError);
        };
        this.syncUrl = (e) => {
            this.setState({ syncUrl: e.target.value });
        };
        this.state = {
            syncUrl: "",
            error: null
        };
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
        return React.createElement(react_bootstrap_1.Modal, { show: this.props.showModal, onHide: this.closeModal, container: this, "aria-labelledby": "contained-modal-title", dialogClassName: this.props.constants.largeEdit ? "large-modal" : "" },
            React.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                React.createElement(react_bootstrap_1.Modal.Title, { id: "contained-modal-title" }, "+ Bulk Create " + this.props.constants.creationTitle)),
            React.createElement(react_bootstrap_1.Modal.Body, null,
                this.state.error &&
                    React.createElement(react_bootstrap_1.Alert, { bsStyle: "danger" }, React.createElement("div", null,
                        errorType && React.createElement("b", null, errorType),
                        errorMessage && React.createElement("div", null, errorMessage))),
                React.createElement(react_bootstrap_1.FormGroup, null,
                    React.createElement(react_bootstrap_1.ControlLabel, null, "Sync URL"),
                    React.createElement(react_bootstrap_1.FormControl, { type: "text", value: this.state.syncUrl, placeholder: "Sync CSV URL", onChange: this.syncUrl }))),
            React.createElement(react_bootstrap_1.Modal.Footer, null,
                React.createElement("div", { className: "btn btn-primary", onClick: this.bulkCreate }, "Sync"),
                React.createElement("div", { className: "btn btn-secondary", onClick: this.closeModal }, "Cancel")));
    }
}
exports.BulkCreateModal = BulkCreateModal;
exports.default = BulkCreateModal;
//# sourceMappingURL=BulkCreatorModal.js.map