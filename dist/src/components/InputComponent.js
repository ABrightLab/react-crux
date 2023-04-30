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
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const TitleComponent_1 = require("./TitleComponent");
const lodash_1 = require("lodash");
function InputComponent(props) {
    const [isValueChanged, toggleIsValueChanged] = React.useState(false);
    const [previousValue, togglePreviousValue] = React.useState(props.value);
    if (previousValue !== props.value && !isValueChanged && props.value) {
        toggleIsValueChanged(true);
    }
    else if (previousValue === props.value && isValueChanged) {
        toggleIsValueChanged(false);
    }
    return React.createElement(React.Fragment, null,
        !(0, lodash_1.isEmpty)(props.title) && React.createElement("span", null,
            React.createElement(TitleComponent_1.TitleComponent, { modalType: props.modalType, field: props.field, isValueChanged: isValueChanged }),
            React.createElement("br", null)),
        React.createElement("input", Object.assign({ disabled: props.disabled, type: props.type, value: props.value, onChange: (e) => props.onChange(e), style: props.style }, props)));
}
exports.default = InputComponent;
//# sourceMappingURL=InputComponent.js.map