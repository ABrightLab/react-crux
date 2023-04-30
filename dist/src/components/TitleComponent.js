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
exports.TitleComponent = void 0;
const React = __importStar(require("react"));
const react_tooltip_1 = __importDefault(require("react-tooltip"));
const TitleComponent = (props) => {
    const { field, isValueChanged, modalType, title } = props;
    return (React.createElement("label", { className: "title_label mr-2" }, title !== null && title !== void 0 ? title : field.title,
        field.required ?
            React.createElement("span", { className: "text-danger", style: {
                    fontSize: 24,
                    position: 'absolute',
                    marginTop: -4,
                    marginLeft: 2
                } }, " * ") : null,
        !!field.description ? React.createElement("span", { "data-tip": field.description, style: {
                borderRadius: 10,
                marginLeft: 10,
                background: 'white',
                color: 'black',
                padding: 4,
                fontSize: 13,
                opacity: 0.5
            } }, "?") : null,
        isValueChanged && modalType === "EDIT" ?
            React.createElement("img", { src: "https://icons.iconarchive.com/icons/custom-icon-design/office/256/edit-icon.png", style: {
                    height: 15,
                    marginLeft: 15
                } }) : null,
        React.createElement(react_tooltip_1.default, null)));
};
exports.TitleComponent = TitleComponent;
//# sourceMappingURL=TitleComponent.js.map