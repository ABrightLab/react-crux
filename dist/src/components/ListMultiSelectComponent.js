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
exports.ListMultiSelectComponent = void 0;
const React = __importStar(require("react"));
const lodash_1 = require("lodash");
const ListMultiSelectComponent = (props) => {
    let selectField = "Loading...";
    try {
        if ((0, lodash_1.isEmpty)(props.model) || !Array.isArray(props.model)) {
            selectField = "";
        }
        const finalString = (0, lodash_1.map)(props.model, (selectValue) => {
            const foreignDoc = (0, lodash_1.find)(props.additionalModels[props.field.modelName], (doc) => {
                return doc[props.field.key] === selectValue;
            });
            let foreignTitle;
            if ((0, lodash_1.isEmpty)(foreignDoc)) {
                foreignTitle = selectValue + " Bad Value";
            }
            else {
                foreignTitle = foreignDoc[props.field.title];
            }
            return foreignTitle;
        }).join(", ");
        selectField = finalString;
    }
    catch (err) {
        selectField = "Loading...";
    }
    return React.createElement("div", null, selectField);
};
exports.ListMultiSelectComponent = ListMultiSelectComponent;
//# sourceMappingURL=ListMultiSelectComponent.js.map