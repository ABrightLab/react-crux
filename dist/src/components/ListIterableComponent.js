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
var ListIterableComponent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListIterableComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const ListNestedComponent_1 = require("./ListNestedComponent");
const ListForeignComponent_1 = require("./ListForeignComponent");
const ListCheckboxComponent_1 = require("./ListCheckboxComponent");
const InlineEditComponent_1 = require("./InlineEditComponent");
const ListMultiSelectComponent_1 = require("./ListMultiSelectComponent");
const lodash_1 = require("lodash");
let ListIterableComponent = ListIterableComponent_1 = class ListIterableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.modelChanged = (index, data, success, error) => {
            const modelCopy = JSON.parse(JSON.stringify(this.props.model));
            modelCopy[index] = data;
            this.props.modelChanged(modelCopy, success, error);
        };
        this.state = {};
    }
    render() {
        return React.createElement("div", null, (0, lodash_1.map)(this.props.model, (datum, index) => {
            const field = this.props.field;
            if (!field.iterabletype) {
                return React.createElement("div", { key: index }, datum);
            }
            else {
                if (!this.props) {
                    return React.createElement("div", null, "Loading ...");
                }
                if (field.iterabletype.type === "iterable") {
                    return (React.createElement(ListIterableComponent_1, { model: datum, field: field, additionalModels: this.props.additionalModels, modelChanged: this.modelChanged.bind(this, index) }));
                }
                if (field.iterabletype.type === "nested") {
                    const filtered = (0, lodash_1.filter)(field.iterabletype.fields, (f) => f.display && (0, lodash_1.has)(datum, f.field));
                    return React.createElement("div", null, (0, lodash_1.map)(filtered, (f, index) => {
                        return React.createElement("div", { className: "html-comma", style: { display: "inline-block" } },
                            React.createElement("span", { style: { display: "inline-block" } },
                                f.title + ":",
                                "\u00A0"),
                            React.createElement("span", { style: { display: "inline-block" } },
                                React.createElement(ListNestedComponent_1.ListNestedComponent, { model: datum, additionalModels: this.props.additionalModels, field: f, modelChanged: this.modelChanged.bind(this, index) })));
                    }));
                }
                if (field.iterabletype.type === "select" || field.iterabletype.type === "searcheableselect") {
                    return React.createElement("div", { key: index },
                        React.createElement(ListForeignComponent_1.ListForeignComponent, { model: datum, field: field.iterabletype.foreign, additionalModels: this.props.additionalModels }));
                }
                if (field.iterabletype.type === "multiselect") {
                    return React.createElement("div", { key: index },
                        React.createElement(ListMultiSelectComponent_1.ListMultiSelectComponent, { model: datum, field: field.foreign, additionalModels: this.props.additionalModels }));
                }
                if (field.iterabletype.type === "checkbox") {
                    return React.createElement(ListCheckboxComponent_1.ListCheckboxComponent, { model: datum, field: field });
                }
                if (field.iterabletype.inlineEdit) {
                    return React.createElement("div", { key: index },
                        React.createElement(InlineEditComponent_1.InlineEditComponent, { text: datum, handleChange: this.modelChanged.bind(this, index) }));
                }
                else {
                    return React.createElement("div", { key: index }, datum);
                }
            }
        }));
    }
};
ListIterableComponent = ListIterableComponent_1 = __decorate([
    autobind_decorator_1.default
], ListIterableComponent);
exports.ListIterableComponent = ListIterableComponent;
//# sourceMappingURL=ListIterableComponent.js.map