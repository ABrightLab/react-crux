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
exports.NestedEditComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const lodash_1 = require("lodash");
const SelectComponent_1 = require("./SelectComponent");
const TypeaheadComponent_1 = require("./TypeaheadComponent");
const DatePickerComponent_1 = require("./DatePickerComponent");
const ImageUploadComponent_1 = require("./ImageUploadComponent");
const IterableEditComponent_1 = require("./IterableEditComponent");
const CheckboxComponent_1 = require("./CheckboxComponent");
const MultiSelectComponent_1 = require("./MultiSelectComponent");
const JsonEditComponent_1 = require("./JsonEditComponent");
const ColorPalleteComponent_1 = require("./ColorPalleteComponent");
const DateTimezoneComponent_1 = require("./DateTimezoneComponent");
const TimePickerComponent_1 = require("./TimePickerComponent");
const DynamicTypeaheadComponent_1 = require("./DynamicTypeaheadComponent");
const TimezoneComponent_1 = require("./TimezoneComponent");
const util_1 = require("../util");
const DynamicMultiSelectComponent_1 = require("./DynamicMultiSelectComponent");
const TitleComponent_1 = require("./TitleComponent");
const InputComponent_1 = __importDefault(require("./InputComponent"));
const TextAreaComponent_1 = __importDefault(require("./TextAreaComponent"));
const NestedEditModalComponent_1 = require("./NestedEditModalComponent");
let NestedEditComponent = class NestedEditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.checkReadonly = (readonly, currentModel) => {
            return this.props.modalType !== "CREATE" && ((0, util_1.getReadOnly)(readonly, currentModel) || this.props.readonly);
        };
        this.updateDefaultValue = (props) => {
            const newValue = {};
            (0, lodash_1.map)(props.field.fields, field => {
                if (field.hasOwnProperty("defaultValueFn") && (!props.currentModel || !props.currentModel.hasOwnProperty(field.field))) {
                    newValue[field.field] = field.defaultValueFn(props);
                }
                if (field.hasOwnProperty("valueFn")) {
                    const resolvedValue = field.valueFn(props);
                    if (!(0, lodash_1.isEqual)(props.currentModel[field.field], resolvedValue)) {
                        newValue[field.field] = resolvedValue;
                    }
                }
            });
            if (!(0, lodash_1.isEmpty)(newValue)) {
                if (props.iterableNested && props.nestedIterableModelChanged) {
                    props.nestedIterableModelChanged(props.index, Object.assign({}, props.currentModel, newValue));
                }
                else {
                    props.modelChanged(Object.assign({}, props.currentModel, newValue));
                }
            }
        };
        this.select = (field, eventKey) => {
            if (this.props.index >= 0) {
                this.props.modelChanged(this.props.index, Object.assign({}, this.props.currentModel, { [field.field]: eventKey }));
            }
            else {
                this.props.modelChanged(Object.assign({}, this.props.currentModel, { [field.field]: eventKey }));
            }
        };
        this.handleChange = (field, event) => {
            const value = event.target.type === "number" ? parseFloat(event.target.value) : event.target.value;
            const newModel = Object.assign({}, this.props.currentModel, { [field.field]: value });
            if (this.props.index >= 0) {
                this.props.modelChanged(this.props.index, newModel);
            }
            else {
                this.props.modelChanged(newModel);
            }
        };
        this.handleFieldChange = (event) => {
            const value = event.target.type === "number" ? parseFloat(event.target.value) : event.target.value;
            let newModel = "";
            if (!(0, lodash_1.isEmpty)(value) || !(0, lodash_1.isNaN)(value)) {
                newModel = Object.assign({}, this.props.currentModel, { [event.target.getAttribute("data-value")]: value });
            }
            else {
                newModel = Object.assign({}, this.props.currentModel, { [event.target.getAttribute("data-value")]: undefined });
            }
            if (this.props.index >= 0) {
                this.props.modelChanged(this.props.index, newModel);
            }
            else {
                this.props.modelChanged(newModel);
            }
        };
        this.collapseToggle = () => {
            this.setState(Object.assign({}, this.state, { collapsed: !this.state.collapsed }));
        };
        this.state = { collapsed: this.props.collapsable && this.props.field.collapsed };
    }
    getEditable(field, modalType) {
        if (modalType === "CREATE" && (0, lodash_1.has)(field, "creatable")) {
            return field.creatable === true;
        }
        if (modalType === "CREATE") {
            return field.editable === true;
        }
        if (modalType === "EDIT" || modalType === "CUSTOM") {
            return field.editable === true || field.readonly === true;
        }
        return false;
    }
    getComponentForField(field, currentModelWithParent) {
        var _a, _b, _c;
        if (field.type === "select") {
            if (field.defaultValue && !(this.props.currentModel && this.props.currentModel[field.field])) {
                this.props.modelChanged(Object.assign({}, this.props.currentModel, { [field.field]: field.defaultValue }));
            }
            const currentModel = (this.props.currentModel && this.props.currentModel[field.field]) ? this.props.currentModel[field.field] : {};
            return (React.createElement(SelectComponent_1.SelectComponent, { field: field, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, modelChanged: this.select, currentModel: currentModel, showTitle: true, parentModel: currentModelWithParent, modalType: this.props.modalType }));
        }
        else if (field.type === "searcheableselect") {
            const currentModel = (this.props.currentModel && this.props.currentModel[field.field]) ? this.props.currentModel[field.field] : {};
            return (React.createElement(MultiSelectComponent_1.MultiSelectComponent, { field: field, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, modelChanged: this.select, currentModel: currentModel, showTitle: true, parentModel: currentModelWithParent, isMulti: false, modalType: this.props.modalType }));
        }
        else if (field.type === "multiselect") {
            const currentModel = (this.props.currentModel && this.props.currentModel[field.field]) ? this.props.currentModel[field.field] : {};
            return (React.createElement(MultiSelectComponent_1.MultiSelectComponent, { field: field, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, modelChanged: this.select, currentModel: currentModel, showTitle: true, parentModel: currentModelWithParent, isMulti: true, modalType: this.props.modalType }));
        }
        else if (field.type === "dynamicMultiselect") {
            const currentModel = (this.props.currentModel && this.props.currentModel[field.field]) ? this.props.currentModel[field.field] : {};
            return (React.createElement(DynamicMultiSelectComponent_1.DynamicMultiSelectComponent, { field: field, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, modelChanged: this.select, currentModel: currentModel, showTitle: true, parentModel: currentModelWithParent, isMulti: true, modalType: this.props.modalType }));
        }
        else if (field.type === "imageUpload") {
            const currentModel = (this.props.currentModel && this.props.currentModel[field.field]) ? this.props.currentModel[field.field] : undefined;
            return (React.createElement(ImageUploadComponent_1.ImageUploadComponent, { field: field, readonly: this.checkReadonly(field.readonly, currentModel), width: this.props.width, height: this.props.height, contentType: field.contentType, additionalModels: this.props.additionalModels, modelChanged: this.select, currentModel: currentModel, showTitle: true, parentModel: currentModelWithParent, modalType: this.props.modalType }));
        }
        else if (field.type === "datepicker") {
            const currentModel = (this.props.currentModel && this.props.currentModel[field.field]) ? this.props.currentModel[field.field] : undefined;
            return (React.createElement(DatePickerComponent_1.DatePickerComponent, { field: field, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, modelChanged: this.select, currentModel: currentModel, showTitle: true, parentModel: currentModelWithParent, modalType: this.props.modalType }));
        }
        else if (field.type === "datetimezonepicker") {
            const currentModel = (this.props.currentModel && this.props.currentModel[field.field]) ? this.props.currentModel[field.field] : undefined;
            return (React.createElement(DateTimezoneComponent_1.DateTimezoneComponent, { field: field, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, modelChanged: this.select, currentModel: currentModel, showTitle: true, parentModel: currentModelWithParent, modalType: this.props.modalType }));
        }
        else if (field.type === "timepicker") {
            const currentModel = (this.props.currentModel && this.props.currentModel[field.field]) ? this.props.currentModel[field.field] : undefined;
            return (React.createElement(TimePickerComponent_1.TimePickerComponent, { field: field, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, modelChanged: this.select, currentModel: currentModel, showTitle: true, parentModel: currentModelWithParent, modalType: this.props.modalType }));
        }
        else if (field.type === "timezone") {
            const currentModel = (this.props.currentModel && this.props.currentModel[field.field]) ? this.props.currentModel[field.field] : undefined;
            return (React.createElement(TimezoneComponent_1.TimezoneComponent, { field: field, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, modelChanged: this.select, currentModel: currentModel, parentModel: currentModelWithParent, modalType: this.props.modalType }));
        }
        else if (field.type === "typeahead") {
            const currentModel = (this.props.currentModel && this.props.currentModel[field.field]) ? this.props.currentModel[field.field] : {};
            return (React.createElement(TypeaheadComponent_1.TypeaheadComponent, { field: field, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, fetch: this.props.fetch, modelChanged: this.select, currentModel: currentModel, showTitle: true, style: field.style, parentModel: currentModelWithParent, modalType: this.props.modalType }));
        }
        else if (field.type === "dynamicTypeahead") {
            const currentModel = this.props.currentModel && this.props.currentModel[field.field] || "";
            return (React.createElement(DynamicTypeaheadComponent_1.DynamicTypeaheadComponent, { field: field, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, fetch: this.props.fetch, modelChanged: this.select, currentModel: currentModel, showTitle: true, parentModel: currentModelWithParent, modalType: this.props.modalType }));
        }
        else if (field.type === "nested") {
            const currentModel = (this.props.currentModel && this.props.currentModel[field.field]) ? this.props.currentModel[field.field] : {};
            return (React.createElement(NestedEditModalComponent_1.NestedEditModalComponent, { field: field, modalType: this.props.modalType, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, fetch: this.props.fetch, modelChanged: this.select.bind(this, field), indent: true, collapsable: (_a = field.collapsable) !== null && _a !== void 0 ? _a : true, nullable: (_b = field.nullable) !== null && _b !== void 0 ? _b : false, expandable: (_c = field.expandable) !== null && _c !== void 0 ? _c : false, currentModel: currentModel, showTitle: true, parentModel: currentModelWithParent }));
        }
        else if (field.type === "iterable") {
            const currentModel = (this.props.currentModel && this.props.currentModel[field.field]) ? this.props.currentModel[field.field] : [];
            return (React.createElement(IterableEditComponent_1.IterableEditComponent, { field: field, modalType: this.props.modalType, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, fetch: this.props.fetch, modelChanged: this.select.bind(this, field), indent: true, currentModel: currentModel, parentModel: currentModelWithParent, anchors: this.props.anchors }));
        }
        else if (field.type === "checkbox") {
            const currentModel = (this.props.currentModel !== undefined && this.props.currentModel[field.field] !== undefined) ? this.props.currentModel[field.field] : {};
            return (React.createElement(CheckboxComponent_1.CheckboxComponent, { field: field, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, modelChanged: this.select, currentModel: currentModel, showTitle: true, modalType: this.props.modalType, parentModel: currentModelWithParent }));
        }
        else if (field.type === "bigtext") {
            const currentModel = this.props.currentModel ? this.props.currentModel[field.field] : "";
            return (React.createElement("div", null,
                React.createElement(TextAreaComponent_1.default, { "data-value": field.field, disabled: this.checkReadonly(field.readonly, currentModel), value: currentModel, onChange: (e) => {
                        this.handleFieldChange(e);
                    }, style: { width: 250 }, title: field.title, field: field, modalType: this.props.modalType })));
        }
        else if (field.type === "colorpallete") {
            return (React.createElement(ColorPalleteComponent_1.ColorPalleteComponent, { field: field, modalType: this.props.modalType, modelChanged: this.select, additionalModels: this.props.additionalModels, currentModel: this.props.currentModel ? this.props.currentModel[field.field] : "", parentModel: currentModelWithParent }));
        }
        else if (field.type === "json") {
            const currentModel = (this.props.currentModel !== undefined && this.props.currentModel[field.field] !== undefined) ? this.props.currentModel[field.field] : {};
            return (React.createElement(JsonEditComponent_1.JsonEditComponent, { field: field, modalType: this.props.modalType, readonly: this.checkReadonly(field.readonly, currentModel), additionalModels: this.props.additionalModels, modelChanged: this.select, currentModel: currentModel, showTitle: true, parentModel: currentModelWithParent }));
        }
        else if (field.type === "number") {
            const currentModel = this.props.currentModel ? this.props.currentModel[field.field] : "";
            return (React.createElement("div", null,
                React.createElement(InputComponent_1.default, { type: "number", "data-value": field.field, disabled: this.checkReadonly(field.readonly, currentModel), value: currentModel, title: field.title, field: field, modalType: this.props.modalType, onChange: (e) => {
                        this.handleFieldChange(e);
                    }, style: { width: 200, paddingTop: 5 } })));
        }
        else if (field.type === "customedit") {
            const CustomEditComponent = field.customEditComponent;
            return (React.createElement("div", null,
                !(0, lodash_1.isEmpty)(field.title) && React.createElement("span", null,
                    React.createElement(TitleComponent_1.TitleComponent, { modalType: this.props.modalType, field: field }),
                    React.createElement("br", null)),
                React.createElement(CustomEditComponent, { modalType: this.props.modalType, currentModel: this.props.currentModel, additionalModels: this.props.additionalModels, parentModel: this.props.parentModel, additionalProps: this.props.additionalProps, field: field, handleChange: this.select })));
        }
        else {
            const currentModel = this.props.currentModel ? this.props.currentModel[field.field] : "";
            return (React.createElement("div", null,
                React.createElement(InputComponent_1.default, { type: "text", "data-value": field.field, title: field.title, modalType: this.props.modalType, field: field, disabled: this.checkReadonly(field.readonly, currentModel), value: this.props.currentModel ? this.props.currentModel[field.field] : "", onChange: (e) => {
                        this.handleFieldChange(e);
                    }, style: field.type === "tinyinput" ? {
                        width: 64,
                        paddingTop: 5
                    } : { width: 200, paddingTop: 5 } })));
        }
    }
    componentDidMount() {
        this.updateDefaultValue(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.updateDefaultValue(nextProps);
    }
    render() {
        if ((0, lodash_1.isEmpty)(this.props) || (0, lodash_1.isEmpty)(this.props.field)) {
            console.error("Nested component got empty field prop. Check the parent component. Props:", this.props);
            return React.createElement("div", null);
        }
        if ((0, lodash_1.isEmpty)(this.props.field.fields)) {
            console.error("Attribute fields missing in the nested component config", this.props.field);
            return React.createElement("div", null);
        }
        let fields;
        if (this.props.modalType === "CREATE" || this.props.modalType === "EDIT" || this.props.modalType === "CUSTOM") {
            fields = (0, lodash_1.filter)(this.props.field.fields, (field) => this.getEditable(field, this.props.modalType));
        }
        else if (this.props.modalType === "FILTER") {
            fields = (0, lodash_1.filter)(this.props.field.fields, (field) => field.filterParameter === true);
        }
        // Filter out the filed not matching specified conditional field
        fields = (0, lodash_1.filter)(fields, (field) => {
            if (field.conditionalField) {
                if (field.negateConditionalValue) {
                    if (Array.isArray(field.conditionalValue)) {
                        return !(this.props.currentModel && field.conditionalValue.includes(this.props.currentModel[field.conditionalField]));
                    }
                    return this.props.currentModel && this.props.currentModel[field.conditionalField] !== field.conditionalValue;
                }
                else {
                    if (Array.isArray(field.conditionalValue)) {
                        return this.props.currentModel && field.conditionalValue.includes(this.props.currentModel[field.conditionalField]);
                    }
                    return this.props.currentModel && this.props.currentModel[field.conditionalField] === field.conditionalValue;
                }
            }
            return true;
        });
        fields = (0, lodash_1.filter)(fields, (field) => {
            if (field.shouldRender) {
                if (typeof field.shouldRender === "function") {
                    if (field.shouldRender.length !== 4) {
                        console.error("No. of arguments don't match in the shouldRender function. Function should have 4 args. Possible culprit: ", field.field);
                        return false;
                    }
                    return field.shouldRender(field.modelName, this.props.currentModel, this.props.additionalModels, this.props.parentModel);
                }
                else {
                    console.error("Did you forget to add \"function\" in the shouldRender field. Function should return boolean.");
                    return false;
                }
            }
            return true;
        });
        const wysiwygFields = (0, lodash_1.filter)(fields, (field) => (field.wysiwyg === true) && (field.type === "custom"));
        return (React.createElement("div", { style: { border: "1px solid #ddd", position: "relative" } },
            this.state.collapsed !== true &&
                React.createElement("div", { style: { display: "block", padding: "10px" } },
                    React.createElement("div", { style: { display: "inline-block" } }, (0, lodash_1.map)((0, lodash_1.filter)(fields, (field) => this.getEditable(field, this.props.modalType) || field.filterParameter === true), (field, index) => {
                        const currentModelWithParent = { data: this.props.currentModel, parentModel: this.props.parentModel };
                        return React.createElement("div", { key: index, style: (this.props.field.displayChildren === "inline") ? Object.assign({ display: "inline-block", marginRight: "30px", marginBottom: "30px", verticalAlign: "top" }, field.wrapperStyles) : Object.assign({ marginBottom: "30px", marginRight: "30px" }, field.wrapperStyles) },
                            React.createElement("div", null, this.getComponentForField(field, currentModelWithParent)));
                    })),
                    !(0, lodash_1.isEmpty)(wysiwygFields) &&
                        React.createElement("div", { style: {
                                display: "inline-block",
                                marginLeft: "50px",
                                maxWidth: "300px",
                                verticalAlign: "top"
                            } }, (0, lodash_1.map)(wysiwygFields, (field, index) => {
                            if (field.customComponent) {
                                const CustomComponent = field.customComponent(this.props.currentModel, this.props.additionalModels, this.props.parentModel, this.props.additionalProps);
                                return React.createElement("div", { key: index },
                                    React.createElement(TitleComponent_1.TitleComponent, { modalType: this.props.modalType, field: field }),
                                    React.createElement(CustomComponent, { key: index }));
                            }
                            else {
                                const CustomComponent = field.customViewComponent;
                                return React.createElement("div", { key: index },
                                    React.createElement(TitleComponent_1.TitleComponent, { modalType: this.props.modalType, field: field }),
                                    React.createElement(CustomComponent, { key: index, currentModel: this.props.currentModel, additionalModels: this.props.additionalModels, parentModel: this.props.parentModel, additionalProps: this.props.additionalProps }));
                            }
                        }))),
            this.props.collapsable && this.state.collapsed &&
                React.createElement("div", { className: "nestedEdit_maximise", onClick: this.collapseToggle },
                    React.createElement("span", null, "\u2795")),
            this.props.collapsable && !this.state.collapsed &&
                React.createElement("div", { className: "nestedEdit_minimise", onClick: this.collapseToggle },
                    React.createElement("span", null, "\u2796")),
            this.props.nullable &&
                React.createElement("div", { className: "nestedEdit_remove", onClick: () => this.props.modelChanged(undefined) },
                    React.createElement("span", null, "\u2716"))));
    }
};
NestedEditComponent = __decorate([
    autobind_decorator_1.default
], NestedEditComponent);
exports.NestedEditComponent = NestedEditComponent;
//# sourceMappingURL=NestedEditComponent.js.map