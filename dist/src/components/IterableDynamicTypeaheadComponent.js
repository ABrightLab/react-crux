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
exports.IterableDynamicTypeaheadComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const DynamicTypeaheadComponent_1 = require("./DynamicTypeaheadComponent");
const lodash_1 = require("lodash");
let IterableDynamicTypeaheadComponent = class IterableDynamicTypeaheadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.showIterableButtons = () => {
            this.setState({ showIterableButton: true });
        };
        this.hideIterableButtons = () => {
            this.setState({ showIterableButton: false });
        };
        this.addAtIndex = () => {
            this.props.addAtIndex(this.props.index);
        };
        this.reorder = (event) => {
            this.setState({ reorderClicked: false });
            this.props.reorder(this.props.index, Number(event.target.getAttribute("data-value")));
        };
        this.reorderAtPosition = () => {
            this.setState({ reorderClicked: false });
            this.props.reorderAtPosition(this.props.index, this.state.moveAtPosition);
        };
        this.customButtonAction = () => {
            this.props.field.additionalButtons.customButtonAction(this.props.currentModel);
        };
        this.remove = () => {
            this.props.remove(this.props.index);
        };
        this.handleReorderClick = () => {
            this.setState({ reorderClicked: true });
        };
        this.handleIntervalChange = (event) => {
            this.setState({ moveAtPosition: event.target.value });
        };
        this.iterableChange = (field, value, currentOption) => {
            this.props.modelChanged(this.props.index, value, currentOption);
        };
        this.iterableButtons = () => {
            if (!this.props.readonly) {
                const iterableButtonStyle = { marginLeft: "10px", color: "grey", cursor: "pointer" };
                const visibility = this.state.showIterableButton ? "visible" : "hidden";
                return (React.createElement("span", { style: { visibility } },
                    this.props.field.additionalButtons &&
                        React.createElement(React.Fragment, null,
                            this.props.field.additionalButtons.addAtIndex &&
                                React.createElement("span", { style: iterableButtonStyle, className: "glyphicon glyphicon-plus", "aria-hidden": "true", onClick: this.addAtIndex }),
                            this.props.field.additionalButtons.reorder && this.props.index != 0 &&
                                React.createElement("span", { style: iterableButtonStyle, "data-value": 0, className: "glyphicon glyphicon-chevron-up", "aria-hidden": "true", onClick: this.props.field.additionalButtons.moveAtIndex && !this.state.reorderClicked ? this.handleReorderClick : this.reorder }),
                            this.props.field.additionalButtons.reorder && this.props.index != this.props.totalLength - 1 &&
                                React.createElement("span", { style: iterableButtonStyle, "data-value": 1, className: "glyphicon glyphicon-chevron-down", "aria-hidden": "true", onClick: this.props.field.additionalButtons.moveAtIndex && !this.state.reorderClicked ? this.handleReorderClick : this.reorder }),
                            this.state.reorderClicked &&
                                React.createElement("input", { type: "number", value: this.state.index, onChange: this.handleIntervalChange, onBlur: this.reorderAtPosition, min: "1", max: this.props.totalLength }),
                            this.props.field.additionalButtons.customButton &&
                                React.createElement("span", { style: iterableButtonStyle, className: "glyphicon glyphicon-eye-open", "aria-hidden": "true", onClick: this.customButtonAction })),
                    React.createElement("span", { style: iterableButtonStyle, className: "glyphicon glyphicon-remove-circle", "aria-hidden": "true", onClick: this.remove })));
            }
            return null;
        };
        this.state = {
            showIterableButton: false,
            options: props.options || []
        };
    }
    componentWillReceiveProps(nextProps) {
        if (!(0, lodash_1.isEmpty)(nextProps.options) && (0, lodash_1.isEmpty)(this.state.options)) {
            this.setState({ options: nextProps.options });
        }
    }
    render() {
        return (React.createElement("div", { key: this.props.index, style: this.props.field.iterabletype.displayChildren === "inline" ? {
                padding: "5px 0px",
                display: "inline-block",
                marginRight: "30px"
            } : { padding: "5px 0px" }, onMouseEnter: this.showIterableButtons, onMouseLeave: this.hideIterableButtons },
            React.createElement("div", { style: this.props.field.iterabletype.style ?
                    Object.assign({}, this.props.field.iterabletype.style, { display: "inline-block" }) : { display: "inline-block" } },
                React.createElement(DynamicTypeaheadComponent_1.DynamicTypeaheadComponent, { readonly: this.props.readonly, constants: this.props.constants, currentModel: this.props.currentModel, fetch: this.props.fetch, field: this.props.field.iterabletype, additionalModels: this.props.additionalModels, modelChanged: this.iterableChange, showTitle: false, parentModel: this.props.parentModel, options: this.props.options, type: this.props.type })),
            this.iterableButtons()));
    }
};
IterableDynamicTypeaheadComponent = __decorate([
    autobind_decorator_1.default
], IterableDynamicTypeaheadComponent);
exports.IterableDynamicTypeaheadComponent = IterableDynamicTypeaheadComponent;
//# sourceMappingURL=IterableDynamicTypeaheadComponent.js.map