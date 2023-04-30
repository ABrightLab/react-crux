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
exports.MultiSelectComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const lodash_1 = require("lodash");
const react_select_1 = __importStar(require("react-select"));
const TitleComponent_1 = require("./TitleComponent");
const MultiValueLabel = (props) => {
    return (React.createElement(react_select_1.components.MultiValueLabel, Object.assign({}, props, { innerProps: Object.assign({}, props.innerProps, { title: props.data.label }) })));
};
let MultiSelectComponent = class MultiSelectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getModalValue = (modelData) => {
            if (this.props.field.foreign.keys && Array.isArray(this.props.field.foreign.keys)) {
                const eventKey = {};
                for (const key of this.props.field.foreign.keys) {
                    eventKey[key] = modelData[key];
                }
                return eventKey;
            }
            return modelData[this.props.field.foreign.key];
        };
        this.getTitle = (modelData) => {
            return this.props.field.foreign.titleTransform ? this.props.field.foreign.titleTransform(modelData) : modelData[this.props.field.foreign.title];
        };
        this.select = (field, eventKey) => {
            if (eventKey && this.props.isMulti) {
                let fieldList = [];
                fieldList = eventKey.map((event) => event.value);
                if (JSON.stringify(fieldList) === JSON.stringify(this.state.previousValue)) {
                    this.setState({
                        isValueChanged: false
                    });
                }
                else {
                    this.setState({
                        isValueChanged: true
                    });
                }
                this.props.modelChanged(field, fieldList);
            }
            else if (this.props.isMulti) {
                if (JSON.stringify([]) === JSON.stringify(this.state.previousValue)) {
                    this.setState({
                        isValueChanged: false
                    });
                }
                else {
                    this.setState({
                        isValueChanged: true
                    });
                }
                this.props.modelChanged(field, []);
            }
            else {
                if (eventKey.value === this.state.previousValue) {
                    this.setState({
                        isValueChanged: false
                    });
                }
                else {
                    this.setState({
                        isValueChanged: true
                    });
                }
                this.props.modelChanged(field, eventKey.value);
            }
        };
        this.state = {
            isValueChanged: false,
            previousValue: this.props.currentModel
        };
    }
    render() {
        const hideLabel = this.props.field.style && this.props.field.style.hideLabel;
        if (!this.props.field.title && !hideLabel) {
            console.error("Did you forget to add a \"title\" in the select field. Possible culprit: ", this.props.field);
        }
        let optionsData = [];
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
        optionsData = optionsData.map((modelData) => {
            return { label: this.getTitle(modelData), value: this.getModalValue(modelData) };
        });
        const placeholderText = !hideLabel ? "Choose " + this.props.field.title : "Choose";
        let multiSelectValue;
        if (this.props.field.foreign) {
            if (!this.props.field.foreign.key && !this.props.field.foreign.keys) {
                console.error(`Did you forget to add a "key(s)" field in foreign. Possible culprit: ${this.props.field}`);
            }
            if (this.props.field.foreign.key && this.props.field.foreign.keys) {
                console.error(`ambiguous use of "key" and "keys", use any one`);
            }
            if (!this.props.field.foreign.title) {
                console.error(`Did you forget to add a "title" field in foreign . Possible culprit: ${this.props.field}`);
            }
            if (!(0, lodash_1.isEmpty)(this.props.currentModel)) {
                let foreignTitle;
                if (this.props.isMulti && Array.isArray(this.props.currentModel)) {
                    multiSelectValue = (0, lodash_1.map)(this.props.currentModel, (value) => {
                        const foreignDoc = (0, lodash_1.find)(optionsData, (doc) => {
                            return doc["value"] == value;
                        });
                        if ((0, lodash_1.isEmpty)(foreignDoc)) {
                            foreignTitle = { label: value + " Bad Value", value };
                        }
                        else {
                            foreignTitle = foreignDoc;
                        }
                        return foreignTitle;
                    });
                }
                else {
                    const foreignDoc = (0, lodash_1.find)(optionsData, (doc) => {
                        if (this.props.field.foreign.keys) {
                            return this.props.field.foreign.keys.every((key) => doc.value[key] == this.props.currentModel[key]);
                        }
                        return doc.value == this.props.currentModel;
                    });
                    if ((0, lodash_1.isEmpty)(foreignDoc)) {
                        foreignTitle = { label: this.props.currentModel + " Bad Value", value: this.props.currentModel };
                    }
                    else {
                        foreignTitle = foreignDoc;
                    }
                    multiSelectValue = foreignTitle;
                }
            }
        }
        else {
            console.error("Did you forget to add a \"foreign\" field with a type: \"select\". Possible culprit: ", this.props.field);
        }
        return React.createElement("div", { style: this.props.field.style || { width: "300px" } },
            this.props.showTitle && !(0, lodash_1.isEmpty)(this.props.field.title) && !hideLabel &&
                React.createElement("div", null,
                    React.createElement(TitleComponent_1.TitleComponent, { modalType: this.props.modalType, field: this.props.field, isValueChanged: this.state.isValueChanged }),
                    React.createElement("br", null)),
            React.createElement(react_select_1.default, { isMulti: this.props.isMulti, isClearable: this.props.field.multiClear || false, isSearchable: true, components: { MultiValueLabel }, closeMenuOnSelect: !this.props.isMulti, onChange: (eventKey) => {
                    this.select(this.props.field, eventKey);
                }, value: multiSelectValue, options: optionsData, isDisabled: this.props.readonly, placeholder: placeholderText }));
    }
};
MultiSelectComponent = __decorate([
    autobind_decorator_1.default
], MultiSelectComponent);
exports.MultiSelectComponent = MultiSelectComponent;
//# sourceMappingURL=MultiSelectComponent.js.map