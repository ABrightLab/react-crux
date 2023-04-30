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
exports.DynamicTypeaheadComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const react_bootstrap_typeahead_1 = require("react-bootstrap-typeahead");
const lodash_1 = require("lodash");
const Actions_1 = require("../Actions");
const TitleComponent_1 = require("./TitleComponent");
let DynamicTypeaheadComponent = class DynamicTypeaheadComponent extends React.Component {
    constructor(props) {
        var _a;
        super(props);
        this.getDynamicPayload = (query) => {
            let dynamicPayload = {};
            if (this.props.field.foreign.dynamicPayloadFn && typeof this.props.field.foreign.dynamicPayloadFn === "function") {
                dynamicPayload = this.props.field.foreign.dynamicPayloadFn({ parentModel: this.props.parentModel, query: query });
            }
            return dynamicPayload;
        };
        this.handleInputChange = (query, e) => {
            this.setState({ query });
        };
        this.handleSearch = (query) => {
            let item = {};
            if (this.props.field.foreign.separateQuery) {
                item = Object.assign({ [this.props.field.foreign.separateQuery]: query, limit: this.state.fetchLimit }, this.getDynamicPayload(query));
            }
            else {
                item = Object.assign({ [this.props.field.foreign.title]: query, limit: this.state.fetchLimit }, this.getDynamicPayload(query));
            }
            (0, Actions_1.fetchDynamicTypeaheadResults)(this.props.field.foreign.modelName, item).then((data) => {
                this.setState({
                    isLoading: false,
                    options: data.results,
                });
            }).catch((error) => {
                console.log("Error while fetching " + this.props.field.foreign.modelName, error);
            });
        };
        this.handleChange = (item) => {
            if (!(0, lodash_1.isEmpty)(item)) {
                const value = item[0].value;
                this.setState({ selected: value, isValueChanged: true });
                if (this.props.type === "iterable") {
                    const currentOption = this.state.options.find((option) => value === this.getModalValue(option));
                    this.props.modelChanged(this.props.field, value, currentOption);
                }
                else {
                    this.props.modelChanged(this.props.field, value);
                }
                if (value === this.state.previousValue) {
                    this.setState({
                        isValueChanged: false
                    });
                }
                else {
                    this.setState({
                        isValueChanged: true
                    });
                }
            }
            else {
                if (undefined === this.state.previousValue) {
                    this.setState({
                        isValueChanged: false
                    });
                }
                else {
                    this.setState({
                        isValueChanged: true
                    });
                }
                this.setState({
                    selected: undefined,
                    isValueChanged: true
                });
            }
        };
        this.handleBlurChange = () => {
            if ((0, lodash_1.isEmpty)(this.state.selected) && !(0, lodash_1.isEmpty)(this.props.currentModel)) {
                this.props.modelChanged(this.props.field, "");
            }
        };
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
        this.state = {
            query: "",
            isLoading: false,
            options: props.options || [],
            isValueChanged: false,
            previousValue: this.props.currentModel || undefined,
            selected: props.currentModel || undefined,
            fetchLimit: (_a = props.field.fetchLimit) !== null && _a !== void 0 ? _a : 10
        };
    }
    componentDidMount() {
        if ((0, lodash_1.isEmpty)(this.state.options) && this.props.type !== "iterable") {
            const item = Object.assign({ limit: this.state.fetchLimit }, this.getDynamicPayload(""));
            if (!(0, lodash_1.isEmpty)(this.state.selected)) {
                if (this.props.field.foreign.keys) {
                    for (const key of this.props.field.foreign.keys) {
                        item[key] = this.state.selected[key];
                    }
                }
                else {
                    item[this.props.field.foreign.key] = this.state.selected;
                }
            }
            (0, Actions_1.fetchDynamicTypeaheadResults)(this.props.field.foreign.modelName, item).then((data) => {
                this.setState({
                    isLoading: false,
                    options: data.results
                });
            }).catch((error) => {
                console.log("Error while fetching " + this.props.field.foreign.modelName, error);
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!(0, lodash_1.isEmpty)(nextProps.options) && (0, lodash_1.isEmpty)(this.state.options)) {
            this.setState({
                isLoading: false,
                options: nextProps.options
            });
        }
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.state.query !== nextState.query) {
            this.handleSearch(nextState.query);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.currentModel !== nextProps.currentModel ||
            this.state.query !== nextState.query ||
            !(0, lodash_1.isEqual)(this.state.options, nextState.options)) {
            return true;
        }
        return false;
    }
    render() {
        let selected = undefined;
        let optionsData = [];
        if (this.state.options.length) {
            optionsData = this.state.options.map((modelData) => {
                return { label: this.getTitle(modelData), value: this.getModalValue(modelData) };
            });
        }
        if (this.state.selected) {
            const selectedRecord = (0, lodash_1.find)(optionsData, (doc) => {
                if (this.props.field.foreign.keys) {
                    return this.props.field.foreign.keys.every((key) => doc.value[key] === this.props.currentModel[key]);
                }
                return doc.value === this.props.currentModel;
            });
            selected = selectedRecord ? [selectedRecord] : [{ label: `${this.state.selected} - Bad Value`, value: this.state.selected }];
        }
        return React.createElement("div", { style: { marginBottom: "10px" } },
            React.createElement("div", { style: { display: "inline-block", width: "300px" } },
                this.props.showTitle && !(0, lodash_1.isEmpty)(this.props.field.title) && !(this.props.field.style && this.props.field.style.hideLabel) &&
                    React.createElement("div", null,
                        React.createElement(TitleComponent_1.TitleComponent, { modalType: this.props.modalType, field: this.props.field, isValueChanged: this.state.isValueChanged }),
                        React.createElement("br", null)),
                React.createElement(react_bootstrap_typeahead_1.AsyncTypeahead, { id: `id-${this.props.field.title}`, labelKey: "label", minLength: 0, isLoading: this.state.isLoading, onSearch: () => { }, onInputChange: this.handleInputChange, onFocus: (e) => {
                        this.setState({
                            query: e.target.value
                        }, () => {
                            this.handleSearch(this.state.query);
                        });
                    }, options: optionsData, selected: selected || [], onChange: this.handleChange, onBlur: this.handleBlurChange, disabled: this.props.readonly })));
    }
};
DynamicTypeaheadComponent = __decorate([
    autobind_decorator_1.default
], DynamicTypeaheadComponent);
exports.DynamicTypeaheadComponent = DynamicTypeaheadComponent;
//# sourceMappingURL=DynamicTypeaheadComponent.js.map