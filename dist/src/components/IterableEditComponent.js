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
exports.IterableEditComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const SelectComponent_1 = require("./SelectComponent");
const CheckboxComponent_1 = require("./CheckboxComponent");
const DatePickerComponent_1 = require("./DatePickerComponent");
const TimePickerComponent_1 = require("./TimePickerComponent");
const TypeaheadComponent_1 = require("./TypeaheadComponent");
const ImageUploadComponent_1 = require("./ImageUploadComponent");
const MultiSelectComponent_1 = require("./MultiSelectComponent");
const ColorPalleteComponent_1 = require("./ColorPalleteComponent");
const IterableNestedComponent_1 = require("./IterableNestedComponent");
const DateTimezoneComponent_1 = require("./DateTimezoneComponent");
const TimezoneComponent_1 = require("./TimezoneComponent");
const util_1 = require("../util");
const Actions_1 = require("../Actions");
const lodash_1 = require("lodash");
const IterableDynamicTypeaheadComponent_1 = require("./IterableDynamicTypeaheadComponent");
const uuid_1 = require("uuid");
const DynamicMultiSelectComponent_1 = require("./DynamicMultiSelectComponent");
const TitleComponent_1 = require("./TitleComponent");
const InputComponent_1 = __importDefault(require("./InputComponent"));
const TextAreaComponent_1 = __importDefault(require("./TextAreaComponent"));
const NestedEditModalComponent_1 = require("./NestedEditModalComponent");
let IterableEditComponent = class IterableEditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getRepIterableField = (index) => {
            let subTitle = "";
            if (this.props.field.iterabletype.hasOwnProperty("subtitleFn")) {
                subTitle = this.props.field.iterabletype.subtitleFn(this.state.model[index]);
                return subTitle;
            }
            if ((0, lodash_1.isEmpty)(this.state.model[index])) {
                return subTitle;
            }
            const repField = this.props.field.iterabletype.fields.find((field) => field.iterableRepresentative);
            if (!repField) {
                console.error("Did you forget to add the representative tag at the top level.");
                return subTitle;
            }
            if ((0, lodash_1.isEmpty)(this.state.model[index][repField.field]) && typeof this.state.model[index][repField.field] !== "number") {
                return subTitle;
            }
            if (!(0, lodash_1.isEmpty)(repField.foreign)) {
                if ((0, lodash_1.isEmpty)(this.props.additionalModels)) {
                    return "Loading .....";
                }
                try {
                    const foreignDoc = this.props.additionalModels[repField.foreign.modelName]
                        .find((datum) => datum[repField.foreign.key] === this.state.model[index][repField.field]);
                    return foreignDoc ? (0, lodash_1.get)(foreignDoc, repField.foreign.title) :
                        this.state.model[index][repField.field] + " - Bad Value";
                }
                catch (err) {
                    return "Loading ....";
                }
            }
            else if (this.state.model[index][repField.field]) {
                subTitle = this.state.model[index][repField.field];
            }
            return subTitle;
        };
        this.checkReadonly = (currentModel) => {
            return this.props.modalType !== "CREATE" && ((0, util_1.getReadOnly)(this.props.field.iterabletype.readonly, currentModel) || this.props.readonly);
        };
        this.handleChange = (index, event) => {
            this.setState({
                isValueChanged: true
            });
            const modelCopy = JSON.parse(JSON.stringify(this.state.model));
            if (event.target.value) {
                modelCopy[index] = event.target.type === "number" ? parseFloat(event.target.value) : event.target.value;
            }
            else {
                modelCopy[index] = undefined;
            }
            this.props.modelChanged(modelCopy);
        };
        this.fieldChanged = (index) => {
            const self = this;
            return function (field, value) {
                const modelCopy = JSON.parse(JSON.stringify(self.state.model));
                modelCopy[index] = value;
                self.props.modelChanged(modelCopy);
            };
        };
        this.nestedFieldChanged = (index, value) => {
            this.setState({
                isValueChanged: true
            });
            const modelCopy = JSON.parse(JSON.stringify(this.state.model));
            modelCopy[index] = value;
            this.props.modelChanged(modelCopy);
        };
        this.iterableDynamicTypeaheadFieldChange = (index, value, currentOption) => {
            this.setState({
                isValueChanged: true
            });
            if (value && currentOption) {
                const optionExist = this.state.dynamicTypeaheadOptions.find((option) => currentOption.widgetId === option.widgetId);
                if (!optionExist) {
                    const newDynamicTypeaheadOptions = [...this.state.dynamicTypeaheadOptions, currentOption];
                    this.setState({ dynamicTypeaheadOptions: newDynamicTypeaheadOptions });
                }
            }
            const modelCopy = JSON.parse(JSON.stringify(this.state.model));
            modelCopy[index] = value;
            this.props.modelChanged(modelCopy);
        };
        this.createNew = () => {
            this.setState({
                isValueChanged: true
            });
            this.props.modelChanged((0, lodash_1.concat)(this.state.model, this.getIterableDefaultValue(this.props.field.iterabletype)));
        };
        this.remove = (index) => {
            this.setState({
                isValueChanged: true
            });
            const modelCopy = JSON.parse(JSON.stringify(this.state.model));
            (0, lodash_1.pullAt)(modelCopy, index);
            if (modelCopy.length) {
                this.props.modelChanged(modelCopy);
            }
            else {
                this.props.modelChanged(undefined);
            }
        };
        this.collapseToggle = () => {
            this.setState(Object.assign({}, this.state, { collapsed: !this.state.collapsed }));
        };
        this.collapseNestedToggle = (index) => {
            let collapsedIndexArray = [];
            collapsedIndexArray.length = this.state.model.length;
            collapsedIndexArray = collapsedIndexArray.fill(true, 0);
            collapsedIndexArray[index] = !this.state.collapsedIndex[index];
            this.setState(Object.assign({}, this.state, { collapsedIndex: collapsedIndexArray }));
        };
        this.addAtIndex = (index) => {
            this.setState({
                isValueChanged: true
            });
            const clone = (0, lodash_1.cloneDeep)(this.state.model);
            const newModel = this.state.newModel;
            newModel[index] = (0, uuid_1.v4)();
            this.setState({ newModel });
            clone.splice(index, 0, this.getIterableDefaultValue(this.props.field.iterabletype));
            this.props.modelChanged(clone);
        };
        this.getIterableDefaultValue = (iterableType) => {
            if (iterableType.type === "nested") {
                // Adding Default Value, while creating new Iterable
                const defaultValue = {};
                (0, lodash_1.map)(this.props.field.iterabletype.fields, field => {
                    if (field.hasOwnProperty("defaultValueFn")) {
                        defaultValue[field.field] = field.defaultValueFn(this.props);
                    }
                });
                return defaultValue;
            }
            else {
                // Adding Default Value, while creating new Iterable
                if (iterableType.hasOwnProperty("defaultValueFn")) {
                    return iterableType.defaultValueFn(this.props);
                }
                return "";
            }
        };
        this.handleReorderClick = () => {
            this.setState({ reorderClicked: true });
        };
        this.handleIntervalChange = (event) => {
            this.setState({ moveAtPosition: event.target.value });
        };
        this.reorderAtPosition = (index, moveAtPosition) => {
            this.setState({ reorderClicked: false });
            if (moveAtPosition !== undefined && !!Number(moveAtPosition)) {
                let tempData;
                this.setState({
                    isValueChanged: true
                });
                const newModel = this.state.newModel;
                const clone = (0, lodash_1.cloneDeep)(this.state.model);
                tempData = clone[index];
                let i;
                clone.splice(index, 1);
                clone.splice(moveAtPosition - 1, 0, tempData);
                if (index > moveAtPosition - 1) {
                    i = moveAtPosition - 1;
                    for (i; i <= index; i++) {
                        newModel[index] = (0, uuid_1.v4)();
                    }
                }
                else {
                    i = index;
                    for (i; i <= moveAtPosition - 1; i++) {
                        newModel[index] = (0, uuid_1.v4)();
                    }
                }
                this.setState({ newModel });
                this.props.modelChanged(clone);
            }
        };
        const modalValue = (0, lodash_1.isEmpty)(this.props.currentModel) ? [] : JSON.parse(JSON.stringify(this.props.currentModel));
        const collapsedIndexArray = [];
        collapsedIndexArray.length = modalValue.length;
        this.state = {
            collapsed: this.props.field.collapsed,
            model: modalValue,
            checkIterableButton: undefined,
            dynamicTypeaheadOptions: [],
            bigTextChanged: false,
            collapsedIndex: [...collapsedIndexArray.fill(props.field.iterabletype.nestedIterableCollapse ?
                    props.field.iterabletype.nestedIterableCollapse.default ? true : false : false, 0)],
            newModel: [...collapsedIndexArray.fill("")]
        };
    }
    componentDidMount() {
        if (this.props.field.iterabletype && this.props.field.iterabletype.type === "dynamicTypeahead") {
            const item = {};
            const widgetIds = this.state.model;
            item[this.props.field.iterabletype.foreign.bulkKey] = widgetIds;
            if ((0, lodash_1.isEmpty)(widgetIds)) {
                item["limit"] = 10;
            }
            (0, Actions_1.fetchDynamicTypeaheadResults)(this.props.field.iterabletype.foreign.modelName, item).then((data) => {
                this.setState({
                    dynamicTypeaheadOptions: data.results,
                });
            }).catch((error) => {
                console.log("Error while fetching " + this.props.field.iterabletype.foreign.modelName, error);
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentModel) {
            this.setState({ model: JSON.parse(JSON.stringify(nextProps.currentModel)) });
        }
    }
    iterableButtons(index, totalLength) {
        if (this.props.field.iterabletype.readonly !== true && !this.props.readonly) {
            const iterableButtonStyle = { marginLeft: "10px", color: "grey", cursor: "pointer" };
            const visibility = this.state.checkIterableButton && this.state.checkIterableButton[index] ? "visible" : "hidden";
            return (React.createElement(React.Fragment, null,
                React.createElement("span", { style: { visibility } }, this.props.field.additionalButtons &&
                    React.createElement(React.Fragment, null,
                        this.props.field.additionalButtons.addAtIndex &&
                            React.createElement("span", { style: iterableButtonStyle, className: "glyphicon glyphicon-plus", "aria-hidden": "true", onClick: this.addAtIndex.bind(this, index) }),
                        this.props.field.additionalButtons.reorder && index != 0 &&
                            React.createElement("span", { style: iterableButtonStyle, className: "glyphicon glyphicon-chevron-up", "aria-hidden": "true", onClick: this.props.field.additionalButtons.moveAtIndex && !this.state.reorderClicked ? this.handleReorderClick : this.reorder.bind(this, index, 0) }),
                        this.props.field.additionalButtons.reorder && index != totalLength - 1 &&
                            React.createElement("span", { style: iterableButtonStyle, className: "glyphicon glyphicon-chevron-down", "aria-hidden": "true", onClick: this.props.field.additionalButtons.moveAtIndex && !this.state.reorderClicked ? this.handleReorderClick : this.reorder.bind(this, index, 1) }),
                        this.state.reorderClicked &&
                            React.createElement("input", { type: "number", value: this.state.index, onChange: this.handleIntervalChange, onBlur: () => this.reorderAtPosition(index, this.state.moveAtPosition), min: "1", max: totalLength }),
                        this.props.field.additionalButtons.customButton &&
                            React.createElement("span", { style: iterableButtonStyle, className: "glyphicon glyphicon-eye-open", "aria-hidden": "true", onClick: this.props.field.additionalButtons.customButtonAction.bind(this, this.state.model[index]) }))),
                React.createElement("div", { className: "iterable_remove", onClick: this.remove.bind(this, index) },
                    React.createElement("span", { style: { display: "table-cell", verticalAlign: "middle" } }, "\u2716"))));
        }
        return null;
    }
    showIterableButtons(index) {
        let checkIterableButton = this.state.checkIterableButton;
        if (!checkIterableButton) {
            checkIterableButton = [];
        }
        checkIterableButton[index] = true;
        this.setState({
            checkIterableButton
        });
    }
    hideIterableButtons(index) {
        let checkIterableButton = this.state.checkIterableButton;
        if (!checkIterableButton) {
            checkIterableButton = [];
        }
        checkIterableButton[index] = false;
        this.setState({
            checkIterableButton
        });
    }
    getIterableNestedTitle(index) {
        var _a, _b;
        const subTitle = this.getRepIterableField(index);
        return ((_b = (_a = this.props.field.iterabletype.nestedIterableCollapse) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "") + "  #" + (index + 1) + (subTitle ? " - " + subTitle : "");
    }
    componentDidUpdate() {
        const uuidArray = this.state.newModel.filter((newModel) => !(0, lodash_1.isEmpty)(newModel));
        const newModelArray = [];
        newModelArray.length = this.state.model.length;
        if (uuidArray.length) {
            this.setState({ newModel: newModelArray.fill("") });
        }
    }
    render() {
        const totalLength = this.state.model.length;
        if (!this.props.field.iterabletype) {
            console.error("Did you forget to add a iterabletype to the field ? Possible culprit:", this.props.field);
        }
        if (!this.props.field.iterabletype.title) {
            console.error("Did you forget to add a title to the iterabletype ? Possible culprit:", this.props.field.iterabletype);
        }
        return React.createElement("div", { style: { border: "1px solid #ccc", position: "relative" } },
            React.createElement("div", { style: { borderBottom: "1px solid #ccc", cursor: "pointer", background: "#eee" } },
                React.createElement(TitleComponent_1.TitleComponent, { modalType: this.props.modalType, field: this.props.field, isValueChanged: this.state.isValueChanged })),
            this.props.field.collapsable && this.state.collapsed &&
                React.createElement("div", { className: "iterableEdit_maximise", onClick: this.collapseToggle },
                    React.createElement("span", { style: { display: "table-cell", verticalAlign: "middle" } }, "\u2795")),
            this.props.field.collapsable && !this.state.collapsed &&
                React.createElement("div", { className: "iterableEdit_minimise", onClick: this.collapseToggle },
                    React.createElement("span", { style: { display: "table-cell", verticalAlign: "middle" } }, "\u2796")),
            this.props.field.nullable &&
                React.createElement("div", { className: "iterableEdit_remove", onClick: () => this.props.modelChanged(undefined) },
                    React.createElement("span", { style: { display: "table-cell", verticalAlign: "middle" } }, "\u2716")),
            this.state.collapsed === true ? null :
                React.createElement("div", { style: { padding: "10px" } }, (0, lodash_1.map)(this.state.model, ((currentModel, index) => {
                    var _a, _b, _c, _d;
                    const parentModel = {
                        data: this.state.model,
                        parentModel: this.props.parentModel
                    };
                    const readonly = this.checkReadonly(currentModel);
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "select") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, style: this.props.field.iterabletype.displayChildren === "inline" ? {
                                padding: "5px", marginTop: "5px", position: "relative", border: "1px solid #ddd",
                                display: "inline-block",
                                marginRight: "30px"
                            } : { padding: "5px", marginTop: "5px", position: "relative", border: "1px solid #ddd" }, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement("div", { style: Object.assign({}, (_a = this.props.field.iterabletype.style) !== null && _a !== void 0 ? _a : {}, { display: "inline-block" }) },
                                React.createElement(SelectComponent_1.SelectComponent, { modalType: this.props.modalType, readonly: readonly, constants: this.props.constants, currentModel: currentModel, field: this.props.field.iterabletype, additionalModels: this.props.additionalModels, modelChanged: this.fieldChanged(index), showTitle: false, parentModel: parentModel })),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "searcheableselect") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, style: this.props.field.iterabletype.displayChildren === "inline" ? {
                                padding: "5px 0px",
                                display: "inline-block",
                                marginRight: "30px"
                            } : { padding: "5px 0px" }, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement("div", { style: this.props.field.iterabletype.style ?
                                    Object.assign({}, this.props.field.iterabletype.style, { display: "inline-block" }) : { display: "inline-block" } },
                                React.createElement(MultiSelectComponent_1.MultiSelectComponent, { modalType: this.props.modalType, readonly: readonly, constants: this.props.constants, currentModel: currentModel, field: this.props.field.iterabletype, additionalModels: this.props.additionalModels, modelChanged: this.fieldChanged(index), showTitle: false, parentModel: parentModel, isMulti: false })),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "dynamicMultiselect") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, style: this.props.field.iterabletype.displayChildren === "inline" ? {
                                padding: "5px 0px",
                                display: "inline-block",
                                marginRight: "30px"
                            } : { padding: "5px 0px" }, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement("div", { style: this.props.field.iterabletype.style ?
                                    Object.assign({}, this.props.field.iterabletype.style, { display: "inline-block" }) : { display: "inline-block" } },
                                React.createElement(DynamicMultiSelectComponent_1.DynamicMultiSelectComponent, { modalType: this.props.modalType, readonly: readonly, constants: this.props.constants, currentModel: currentModel, field: this.props.field.iterabletype, additionalModels: this.props.additionalModels, modelChanged: this.fieldChanged(index), showTitle: false, parentModel: parentModel, isMulti: false })),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "multiselect") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, style: this.props.field.iterabletype.displayChildren === "inline" ? {
                                padding: "5px 0px",
                                display: "inline-block",
                                marginRight: "30px"
                            } : { padding: "5px 0px" }, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement("div", { style: this.props.field.iterabletype.style ?
                                    Object.assign({}, this.props.field.iterabletype.style, { display: "inline-block" }) : { display: "inline-block" } },
                                React.createElement(MultiSelectComponent_1.MultiSelectComponent, { modalType: this.props.modalType, readonly: readonly, constants: this.props.constants, currentModel: currentModel, field: this.props.field.iterabletype, additionalModels: this.props.additionalModels, modelChanged: this.fieldChanged(index), showTitle: false, parentModel: parentModel, isMulti: true })),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "imageUpload") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, style: this.props.field.iterabletype.displayChildren === "inline" ? {
                                padding: "5px 0px",
                                display: "inline-block",
                                marginRight: "30px"
                            } : { padding: "5px 0px" }, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement("div", { style: this.props.field.iterabletype.style ?
                                    Object.assign({}, this.props.field.iterabletype.style, { display: "inline-block" }) : { display: "inline-block" } },
                                React.createElement(ImageUploadComponent_1.ImageUploadComponent, { modalType: this.props.modalType, constants: this.props.constants, readonly: readonly, width: this.props.width, height: this.props.height, contentType: this.props.field.contentType, currentModel: currentModel, field: this.props.field.iterabletype, additionalModels: this.props.additionalModels, modelChanged: this.fieldChanged(index), showTitle: false, parentModel: parentModel })),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "datepicker") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, style: this.props.field.iterabletype.displayChildren === "inline" ? {
                                padding: "5px 0px",
                                display: "inline-block",
                                marginRight: "30px"
                            } : { padding: "5px 0px" }, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement("div", { style: this.props.field.iterabletype.style ?
                                    Object.assign({}, this.props.field.iterabletype.style, { display: "inline-block" }) : { display: "inline-block" } },
                                React.createElement(DatePickerComponent_1.DatePickerComponent, { modalType: this.props.modalType, constants: this.props.constants, currentModel: currentModel, field: this.props.field.iterabletype, additionalModels: this.props.additionalModels, modelChanged: this.fieldChanged(index), showTitle: false, parentModel: parentModel, readonly: readonly })),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "timepicker") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, style: this.props.field.iterabletype.displayChildren === "inline" ? {
                                padding: "5px 0px",
                                display: "inline-block",
                                marginRight: "30px"
                            } : { padding: "5px 0px" }, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement("div", { style: this.props.field.iterabletype.style ?
                                    Object.assign({}, this.props.field.iterabletype.style, { display: "inline-block" }) : { display: "inline-block" } },
                                React.createElement(TimePickerComponent_1.TimePickerComponent, { modalType: this.props.modalType, constants: this.props.constants, currentModel: currentModel, field: this.props.field.iterabletype, additionalModels: this.props.additionalModels, modelChanged: this.fieldChanged(index), showTitle: false, parentModel: parentModel, readonly: readonly })),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "timezone") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, style: this.props.field.iterabletype.displayChildren === "inline" ? {
                                padding: "5px 0px",
                                display: "inline-block",
                                marginRight: "30px"
                            } : { padding: "5px 0px" }, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement("div", { style: this.props.field.iterabletype.style ?
                                    Object.assign({}, this.props.field.iterabletype.style, { display: "inline-block" }) : { display: "inline-block" } },
                                React.createElement(TimezoneComponent_1.TimezoneComponent, { modalType: this.props.modalType, field: this.props.field.iterabletype, readonly: readonly, additionalModels: this.props.additionalModels, modelChanged: this.fieldChanged(index), currentModel: currentModel, parentModel: parentModel })),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "datetimezonepicker") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, style: this.props.field.iterabletype.displayChildren === "inline" ? {
                                padding: "5px 0px",
                                display: "inline-block",
                                marginRight: "30px"
                            } : { padding: "5px 0px" }, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement("div", { style: this.props.field.iterabletype.style ?
                                    Object.assign({}, this.props.field.iterabletype.style, { display: "inline-block" }) : { display: "inline-block" } },
                                React.createElement(DateTimezoneComponent_1.DateTimezoneComponent, { field: this.props.field.iterabletype, readonly: readonly, modalType: this.props.modalType, additionalModels: this.props.additionalModels, modelChanged: this.fieldChanged(index), currentModel: currentModel, showTitle: false, parentModel: parentModel })),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "typeahead") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index + currentModel, style: this.props.field.iterabletype.displayChildren === "inline" ? {
                                padding: "5px 0px",
                                display: "inline-block",
                                marginRight: "30px"
                            } : { padding: "5px 0px" }, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement("div", { style: this.props.field.iterabletype.style ?
                                    Object.assign({}, this.props.field.iterabletype.style, { display: "inline-block" }) : { display: "inline-block" } },
                                React.createElement(TypeaheadComponent_1.TypeaheadComponent, { modalType: this.props.modalType, readonly: readonly, constants: this.props.constants, currentModel: currentModel, fetch: this.props.fetch, field: this.props.field.iterabletype, additionalModels: this.props.additionalModels, modelChanged: this.fieldChanged(index), showTitle: false, parentModel: parentModel })),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "dynamicTypeahead") {
                        return React.createElement(IterableDynamicTypeaheadComponent_1.IterableDynamicTypeaheadComponent, { key: "iterable" + this.props.field.iterabletype.type + index + this.state.newModel[index], index: index, readonly: readonly, currentModel: currentModel, fetch: this.props.fetch, field: this.props.field, additionalModels: this.props.additionalModels, modelChanged: this.iterableDynamicTypeaheadFieldChange, modalType: this.props.modalType, parentModel: parentModel, collapsable: this.state.collapsedIndex[index] || false, totalLength: totalLength, remove: this.remove, addAtIndex: this.addAtIndex, reorder: this.reorder, reorderAtPosition: this.reorderAtPosition, type: "iterable", options: this.state.dynamicTypeaheadOptions });
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "nested") {
                        return React.createElement(IterableNestedComponent_1.IterableNestedComponent, { key: "iterable" + this.props.field.iterabletype.type + index, index: index, readonly: readonly, currentModel: currentModel, fetch: this.props.fetch, field: this.props.field, additionalModels: this.props.additionalModels, modelChanged: this.nestedFieldChanged, showTitle: false, indent: false, modalType: this.props.modalType, parentModel: parentModel, collapsable: true, collapsed: this.state.collapsedIndex[index] || false, nullable: this.props.field.nullable, totalLength: totalLength, collapseNestedToggle: this.collapseNestedToggle, getIterableNestedTitle: this.getIterableNestedTitle, remove: this.remove, addAtIndex: this.addAtIndex, reorder: this.reorder, reorderAtPosition: this.reorderAtPosition });
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "recursive") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, style: { border: "1px solid #EEE", padding: "10px" }, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement(NestedEditModalComponent_1.NestedEditModalComponent, { currentModel: currentModel, readonly: readonly, fetch: this.props.fetch, field: Object.assign({}, this.props.anchors[this.props.field.iterabletype.recursivetype], this.props.field.iterabletype.recursiveOverrides), additionalModels: this.props.additionalModels, modelChanged: this.fieldChanged(index).bind(this, undefined), collapsable: (_b = this.props.field.iterabletype.collapsable) !== null && _b !== void 0 ? _b : true, expandable: (_c = this.props.field.iterabletype.expandable) !== null && _c !== void 0 ? _c : false, nullable: (_d = this.props.field.iterabletype.nullable) !== null && _d !== void 0 ? _d : false, showTitle: true, indent: true, modalType: this.props.modalType, parentModel: parentModel }),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "checkbox") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, style: { display: "inline-block" }, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement(CheckboxComponent_1.CheckboxComponent, { readonly: readonly, currentModel: currentModel, modalType: this.props.modalType, field: this.props.field.iterabletype, additionalModels: this.props.additionalModels, modelChanged: this.fieldChanged(index), showTitle: false, parentModel: parentModel }),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "colorpallete") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement(ColorPalleteComponent_1.ColorPalleteComponent, { modalType: this.props.modalType, field: this.props.field.iterabletype, modelChanged: this.fieldChanged(index), additionalModels: this.props.additionalModels, currentModel: currentModel, parentModel: parentModel }),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "bigtext") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement(TextAreaComponent_1.default, { disabled: readonly, value: currentModel, onChange: this.handleChange.bind(this, index, "bigTextChanged"), style: { width: 250 } }),
                            this.iterableButtons(index, totalLength));
                    }
                    if (this.props.field.iterabletype && this.props.field.iterabletype.type === "number") {
                        return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                            React.createElement(InputComponent_1.default, { disabled: readonly, type: "number", value: currentModel, onChange: this.handleChange.bind(this, index, "numberChanged"), style: { width: 200, paddingTop: 5 } }),
                            this.iterableButtons(index, totalLength));
                    }
                    return React.createElement("div", { key: "iterable" + this.props.field.iterabletype.type + index, onMouseEnter: this.showIterableButtons.bind(this, index), onMouseLeave: this.hideIterableButtons.bind(this, index) },
                        React.createElement(InputComponent_1.default, { disabled: readonly, type: "text", value: currentModel, onChange: this.handleChange.bind(this, index), style: this.props.field.iterabletype === "tinyinput" ? {
                                width: 64,
                                paddingTop: 5
                            } : { width: 200, paddingTop: 5 } }),
                        this.iterableButtons(index, totalLength));
                }))),
            this.props.field.iterabletype.readonly !== true && !this.props.readonly &&
                React.createElement("div", { className: "btn btn-xs btn-passive", style: { marginTop: "5px" }, onClick: this.createNew },
                    "+Add ",
                    this.props.field.iterabletype.title));
    }
    reorder(index, flag) {
        this.setState({ reorderClicked: false });
        this.setState({
            isValueChanged: true
        });
        const newModel = this.state.newModel;
        const clone = (0, lodash_1.cloneDeep)(this.state.model);
        let tempArr;
        if (flag === 0) {
            tempArr = clone[index - 1];
            clone[index - 1] = clone[index];
            newModel[index - 1] = (0, uuid_1.v4)();
        }
        else if (flag === 1) {
            tempArr = clone[index + 1];
            clone[index + 1] = clone[index];
            newModel[index + 1] = (0, uuid_1.v4)();
        }
        clone[index] = tempArr;
        newModel[index] = (0, uuid_1.v4)();
        this.setState({ newModel });
        this.props.modelChanged(clone);
    }
};
IterableEditComponent = __decorate([
    autobind_decorator_1.default
], IterableEditComponent);
exports.IterableEditComponent = IterableEditComponent;
//# sourceMappingURL=IterableEditComponent.js.map