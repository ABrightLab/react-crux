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
exports.InlineEditComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
let InlineEditComponent = class InlineEditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: this.props.text, edit: false, loading: false };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ text: nextProps.text, edit: false, loading: false });
    }
    render() {
        return React.createElement("div", null,
            this.state.edit ?
                React.createElement("input", { type: "text", value: this.state.text, onKeyPress: this.handleEnter, style: { paddingTop: 5 }, onChange: this.handleChange }) :
                React.createElement("span", { onClick: this.startEditing }, this.state.text),
            this.state.loading && React.createElement("i", { className: "fa fa-spinner fa-spin", style: { fontSize: 12, marginLeft: 10 } }));
    }
    startEditing() {
        this.setState(Object.assign(Object.assign({}, this.state), { edit: true }));
    }
    stopEditing() {
        this.setState(Object.assign(Object.assign({}, this.state), { edit: false }));
    }
    startLoading() {
        this.setState(Object.assign(Object.assign({}, this.state), { loading: true, edit: false }));
    }
    stopLoading() {
        this.setState(Object.assign(Object.assign({}, this.state), { loading: false }));
    }
    handleChange(e) {
        this.setState(Object.assign(Object.assign({}, this.state), { text: e.target.value }));
    }
    handleEnter(e) {
        if (e.key === "Enter") {
            this.startLoading();
            this.props.handleChange(this.state.text, this.success, this.error);
        }
    }
    success() {
        this.stopEditing();
        this.stopLoading();
    }
    error(err) {
        this.stopLoading();
    }
};
InlineEditComponent = __decorate([
    autobind_decorator_1.default
], InlineEditComponent);
exports.InlineEditComponent = InlineEditComponent;
//# sourceMappingURL=InlineEditComponent.js.map