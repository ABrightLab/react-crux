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
exports.ColorPalleteComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const react_color_1 = require("react-color");
const reactcss_1 = __importDefault(require("reactcss"));
const TitleComponent_1 = require("./TitleComponent");
let ColorPalleteComponent = class ColorPalleteComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = () => {
            this.setState({ displayColorPicker: !this.state.displayColorPicker });
        };
        this.handleClose = () => {
            this.setState({ displayColorPicker: false });
        };
        this.handleColorChange = (color) => {
            if (this.state.previousValue === color.hex) {
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
                isValueChanged: true
            });
            this.props.modelChanged(this.props.field, color.hex);
        };
        this.state = {
            displayColorPicker: false,
            isValueChanged: false,
            previousValue: this.props.currentModel
        };
    }
    componentDidMount() {
        if (!this.props.currentModel) {
            this.props.modelChanged(this.props.field, this.props.currentModel || this.props.field.defaultValue || "#cecece");
        }
    }
    convertHex(hex, opacity) {
        hex = hex.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    }
    render() {
        const styles = (0, reactcss_1.default)({
            "default": {
                color: {
                    width: "200px",
                    height: "24px",
                    borderRadius: "2px",
                    background: `${this.convertHex(this.props.currentModel || this.props.field.defaultValue || "#cecece", 100)}`,
                },
                swatch: {
                    padding: "5px",
                    background: "#fff",
                    borderRadius: "1px",
                    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                    display: "inline-block",
                    cursor: "pointer",
                },
                popover: {
                    position: "absolute",
                    zIndex: 2,
                },
                cover: {
                    position: "fixed",
                    top: "0px",
                    right: "0px",
                    bottom: "0px",
                    left: "0px",
                },
            },
        });
        return React.createElement("div", null,
            React.createElement("div", null,
                React.createElement(TitleComponent_1.TitleComponent, { modalType: this.props.modalType, field: this.props.field, isValueChanged: this.state.isValueChanged })),
            React.createElement("div", { style: styles.swatch, onClick: this.handleClick },
                React.createElement("div", { style: styles.color })),
            this.state.displayColorPicker ?
                React.createElement("div", { style: styles.popover },
                    React.createElement("div", { onClick: this.handleClose, style: styles.cover }),
                    React.createElement(react_color_1.SketchPicker, { color: { hex: this.convertHex(this.props.currentModel || this.props.field.defaultValue || "#cecece", 100) }, onChange: this.handleColorChange })) : null);
    }
};
ColorPalleteComponent = __decorate([
    autobind_decorator_1.default
], ColorPalleteComponent);
exports.ColorPalleteComponent = ColorPalleteComponent;
//# sourceMappingURL=ColorPalleteComponent.js.map