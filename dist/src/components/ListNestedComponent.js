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
var ListNestedComponent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNestedComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const lodash_1 = require("lodash");
const ListIterableComponent_1 = require("./ListIterableComponent");
const ListDateComponent_1 = require("./ListDateComponent");
const ListCheckboxComponent_1 = require("./ListCheckboxComponent");
const ListForeignComponent_1 = require("./ListForeignComponent");
const InlineEditComponent_1 = require("./InlineEditComponent");
const ListMultiSelectComponent_1 = require("./ListMultiSelectComponent");
const ListDateTimezoneComponent_1 = require("./ListDateTimezoneComponent");
let ListNestedComponent = ListNestedComponent_1 = class ListNestedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.modelChanged = (data, success, error) => {
            const newModel = Object.assign({}, this.props.model, { [this.props.field.field]: data });
            this.props.modelChanged(newModel, success, error);
        };
        this.state = {};
    }
    render() {
        if (this.props.field.conditionalField) {
            if (this.props.field.negateConditionalValue) {
                if (Array.isArray(this.props.field.conditionalValue)) {
                    if ((0, lodash_1.includes)(this.props.field.conditionalValue, this.props.model[this.props.field.conditionalField])) {
                        return React.createElement("div", null);
                    }
                }
                else if (this.props.field.conditionalValue === this.props.model[this.props.field.conditionalField]) {
                    return React.createElement("div", null);
                }
            }
            else {
                if (Array.isArray(this.props.field.conditionalValue)) {
                    if (!(0, lodash_1.includes)(this.props.field.conditionalValue, this.props.model[this.props.field.conditionalField])) {
                        return React.createElement("div", null);
                    }
                }
                else if (this.props.field.conditionalValue !== this.props.model[this.props.field.conditionalField]) {
                    return React.createElement("div", null);
                }
            }
        }
        if (this.props.field.type === "custom") {
            if (this.props.field.customComponent) {
                const CustomComponent = this.props.field.customComponent(this.props.model, this.props.additionalModels, this.props.parentModel, this.modelChanged);
                return React.createElement(CustomComponent, null);
            }
            else {
                const CustomComponent = this.props.field.customViewComponent;
                return React.createElement(CustomComponent, { currentModel: this.props.model, additionalModels: this.props.additionalModels, parentModel: this.props.parentModel, additionalProps: this.props.additionalProps, modelChanged: this.modelChanged });
            }
        }
        else {
            const value = this.props.model[this.props.field.field];
            const field = this.props.field;
            if (value === null || value === undefined) {
                return React.createElement("div", null);
            }
            if (typeof value === "object" && (0, lodash_1.isEmpty)(value) && (0, lodash_1.isEmpty)(field.foreign)) {
                return React.createElement("div", null);
            }
            if (!this.props) {
                return React.createElement("div", null, "Loading ...");
            }
            if (field.type === "iterable") {
                return React.createElement(ListIterableComponent_1.ListIterableComponent, { model: value, field: field, additionalModels: this.props.additionalModels, modelChanged: this.modelChanged });
            }
            if (field.type === "datepicker") {
                return React.createElement(ListDateComponent_1.ListDateComponent, { model: value, field: field });
            }
            if (field.type === "datetimezonepicker") {
                return React.createElement(ListDateTimezoneComponent_1.ListDateTimezoneComponent, { model: value, field: field });
            }
            if (field.type === "checkbox") {
                return React.createElement(ListCheckboxComponent_1.ListCheckboxComponent, { model: value, field: field });
            }
            if (field.type === "nested") {
                return (0, lodash_1.map)((0, lodash_1.filter)(field.fields, (f) => f.display && (typeof value[f.field] === "number" || !(0, lodash_1.isEmpty)(value[f.field]))), (f, index) => (React.createElement("div", { key: index },
                    React.createElement("span", null, f.title + " : "),
                    React.createElement("span", null,
                        React.createElement(ListNestedComponent_1, { field: f, model: value, additionalModels: this.props.additionalModels, modelChanged: this.modelChanged })))));
            }
            if (field.type === "multiselect") {
                return React.createElement(ListMultiSelectComponent_1.ListMultiSelectComponent, { model: this.props.model[field.field], field: field.foreign, additionalModels: this.props.additionalModels });
            }
            if (!(0, lodash_1.isEmpty)(field.foreign)) {
                return React.createElement(ListForeignComponent_1.ListForeignComponent, { model: this.props.model[field.field], field: field.foreign, additionalModels: this.props.additionalModels });
            }
            if (field.inlineEdit) {
                return React.createElement(InlineEditComponent_1.InlineEditComponent, { text: value, handleChange: this.modelChanged });
            }
            return React.createElement("div", null, value);
        }
    }
};
ListNestedComponent = ListNestedComponent_1 = __decorate([
    autobind_decorator_1.default
], ListNestedComponent);
exports.ListNestedComponent = ListNestedComponent;
//# sourceMappingURL=ListNestedComponent.js.map