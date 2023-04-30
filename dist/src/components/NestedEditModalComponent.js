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
exports.NestedEditModalComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const CruxComponent_1 = require("../CruxComponent");
const react_bootstrap_1 = require("react-bootstrap");
const TitleComponent_1 = require("./TitleComponent");
let NestedEditModalComponent = class NestedEditModalComponent extends React.Component {
    constructor(props) {
        var _a, _b;
        super(props);
        this.modelChanged = (value) => {
            if (this.props.index >= 0) {
                this.props.modelChanged(this.props.index, value);
            }
            else {
                this.props.modelChanged(value);
            }
        };
        this.collapseToggle = () => {
            this.setState(Object.assign({}, this.state, { collapsed: !this.state.collapsed }));
        };
        this.state = { showModal: false, collapsed: (_b = (_a = props.collapsed) !== null && _a !== void 0 ? _a : props.collapsable) !== null && _b !== void 0 ? _b : false };
    }
    getComponent() {
        return (React.createElement(CruxComponent_1.NestedEditComponent, { index: this.props.index, readonly: this.props.readonly, currentModel: this.props.currentModel, fetch: this.props.fetch, field: this.props.field, additionalModels: this.props.additionalModels, nestedIterableModelChanged: this.props.modelChanged, modelChanged: this.props.modelChanged, showTitle: false, indent: false, collapsable: this.props.field.collapsable, nullable: this.props.field.nullable, iterableNested: true, modalType: this.props.modalType, parentModel: this.props.parentModel }));
    }
    render() {
        const titleStyle = { fontSize: "14px", fontWeight: "bold", marginBottom: "10px", color: "black", display: "flex" };
        const errorClassName = this.state.error ? "error-animate" : "";
        return React.createElement("div", { style: { border: "1px solid #ccc", marginTop: "10px", position: "relative" } },
            React.createElement("div", { style: { borderBottom: "1px solid #ccc", cursor: "pointer", background: "#eee" } },
                React.createElement(TitleComponent_1.TitleComponent, { modalType: this.props.modalType, field: this.props.field }),
                this.props.expandable &&
                    React.createElement("div", { className: "nestedEdit_expand", onClick: () => { this.setState({ showModal: true }); } },
                        React.createElement("span", null, "\u2750")),
                this.props.collapsable && this.state.collapsed &&
                    React.createElement("div", { className: "nestedEdit_maximise", onClick: this.collapseToggle },
                        React.createElement("span", null, "\u2795")),
                this.props.collapsable && !this.state.collapsed &&
                    React.createElement("div", { className: "nestedEdit_minimise", onClick: this.collapseToggle },
                        React.createElement("span", null, "\u2796")),
                this.props.nullable &&
                    React.createElement("div", { className: "nestedEdit_remove", onClick: () => this.props.modelChanged(undefined) },
                        React.createElement("span", null, "\u2716"))),
            this.props.collapsable && !this.state.collapsed && this.getComponent(),
            React.createElement(react_bootstrap_1.Modal, { show: this.props.expandable === true && this.state.showModal === true, onHide: () => {
                    this.setState({ showModal: false });
                }, container: this, "aria-labelledby": "contained-modal-title", backdrop: true, dialogClassName: errorClassName },
                React.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                    React.createElement(react_bootstrap_1.Modal.Title, { id: "contained-modal-title" }, this.props.field.field)),
                React.createElement(react_bootstrap_1.Modal.Body, { className: "modal-height" }, this.getComponent())));
    }
};
NestedEditModalComponent = __decorate([
    autobind_decorator_1.default
], NestedEditModalComponent);
exports.NestedEditModalComponent = NestedEditModalComponent;
//# sourceMappingURL=NestedEditModalComponent.js.map