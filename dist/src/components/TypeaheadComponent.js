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
exports.TypeaheadComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const lodash_1 = require("lodash");
const react_bootstrap_typeahead_1 = require("react-bootstrap-typeahead");
const TitleComponent_1 = require("./TitleComponent");
let TypeaheadComponent = class TypeaheadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.refreshMovements = () => {
            this.props.fetch("movements");
        };
        this.handleChange = (selected) => {
            if (!(0, lodash_1.isEmpty)(selected)) {
                const newObject = selected[0];
                if (newObject[this.props.field.foreign.key] === this.state.previousValue) {
                    this.setState({
                        isValueChanged: false
                    });
                }
                else {
                    this.setState({
                        isValueChanged: true
                    });
                }
                this.props.modelChanged(this.props.field, newObject[this.props.field.foreign.key]);
            }
            else {
                if ("" === this.state.previousValue) {
                    this.setState({
                        isValueChanged: false
                    });
                }
                else {
                    this.setState({
                        isValueChanged: true
                    });
                }
                this.props.modelChanged(this.props.field, undefined);
            }
        };
        this.state = {
            isValueChanged: false,
            previousValue: this.props.currentModel
        };
    }
    render() {
        let selected = undefined;
        let optionsData = [];
        if (this.props.field.foreign) {
            if (this.props.field.foreign.transform) {
                if (typeof this.props.field.foreign.transform === "function") {
                    optionsData = this.props.field.foreign.transform(this.props.field.foreign.modelName, this.props.currentModel, this.props.additionalModels, this.props.parentModel);
                }
                else {
                    console.error("Did you forget to add \"function\" in the transform field. Function should return an array. Possible culprit: ", this.props.field);
                }
            }
            else {
                optionsData = (0, lodash_1.isEmpty)(this.props.field.foreign.orderby)
                    ? this.props.additionalModels[this.props.field.foreign.modelName]
                    : (0, lodash_1.sortBy)(this.props.additionalModels[this.props.field.foreign.modelName], (doc) => (0, lodash_1.trim)(doc[this.props.field.foreign.orderby].toLowerCase()));
            }
            if (!(0, lodash_1.isEmpty)(this.props.currentModel)) {
                selected = (0, lodash_1.find)(optionsData, (option) => option[this.props.field.foreign.key] === this.props.currentModel);
                if (!selected) {
                    selected = { [this.props.field.foreign.title]: this.props.currentModel + " - Bad Value", [this.props.field.foreign.key]: "" };
                }
            }
        }
        else {
            console.error("Did you forget to add a \"foreign\" field with a type: \"select\". Possible culprit: ", this.props.field);
        }
        return React.createElement("div", { style: this.props.style },
            this.props.showTitle &&
                !(this.props.field.style && this.props.field.style.hideLabel) &&
                React.createElement("div", null,
                    React.createElement(TitleComponent_1.TitleComponent, { modalType: this.props.modalType, field: this.props.field, isValueChanged: this.state.isValueChanged }),
                    this.props.field.showRefresh &&
                        React.createElement("span", { style: { float: "right", fontSize: "10px" } },
                            React.createElement("span", { style: { marginLeft: "20px", color: "grey" }, className: "glyphicon glyphicon-refresh", "aria-hidden": "true", onClick: this.refreshMovements })),
                    React.createElement("br", null)),
            React.createElement(react_bootstrap_typeahead_1.Typeahead, { labelKey: this.props.field.foreign.title, onChange: this.handleChange, options: optionsData, disabled: this.props.readonly, selected: selected ? [selected] : undefined }));
    }
};
TypeaheadComponent = __decorate([
    autobind_decorator_1.default
], TypeaheadComponent);
exports.TypeaheadComponent = TypeaheadComponent;
//# sourceMappingURL=TypeaheadComponent.js.map