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
exports.JsonEditComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const react_json_view_1 = __importDefault(require("react-json-view"));
const TitleComponent_1 = require("./TitleComponent");
let JsonEditComponent = class JsonEditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleModify = (addPayload) => {
            if (addPayload.updated_src === this.state.previousValue) {
                this.setState({
                    isValueChanged: false
                });
            }
            else {
                this.setState({
                    isValueChanged: true
                });
            }
            if (this.props.readonly) {
                return false;
            }
            try {
                JSON.stringify(addPayload.updated_src);
            }
            catch (e) {
                console.error(`Invalid JSON. Culprit: ${this.props.field}`);
                return false;
            }
            this.props.modelChanged(this.props.field, addPayload.updated_src);
            return true;
        };
        this.state = { isValueChanged: false, previousValue: this.props.currentModel };
    }
    render() {
        const { field, currentModel } = this.props;
        return (React.createElement("div", null,
            field.title && React.createElement("span", null,
                React.createElement(TitleComponent_1.TitleComponent, { modalType: this.props.modalType, field: field, isValueChanged: this.state.isValueChanged }),
                React.createElement("br", null)),
            React.createElement(react_json_view_1.default, { style: { borderWidth: "2px" }, name: field.field, src: currentModel, onAdd: this.handleModify, onEdit: this.handleModify, onDelete: this.handleModify })));
    }
};
JsonEditComponent = __decorate([
    autobind_decorator_1.default
], JsonEditComponent);
exports.JsonEditComponent = JsonEditComponent;
//# sourceMappingURL=JsonEditComponent.js.map