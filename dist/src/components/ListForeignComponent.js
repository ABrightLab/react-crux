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
exports.ListForeignComponent = void 0;
const React = __importStar(require("react"));
const lodash_1 = require("lodash");
const ListForeignComponent = (props) => {
    let selectField = "Loading...";
    if (!(0, lodash_1.isEmpty)(props.additionalModels)) {
        try {
            if ((0, lodash_1.isEmpty)(props.model) && !(0, lodash_1.isNumber)(props.model)) {
                selectField = "";
            }
            const foreignDoc = props.additionalModels[props.field.modelName]
                .find((datum) => datum[props.field.key] === props.model);
            selectField = foreignDoc ? (0, lodash_1.get)(foreignDoc, props.field.title) :
                props.model + " - Bad Value";
        }
        catch (err) {
            selectField = "Loading...";
        }
    }
    return React.createElement("div", null, selectField);
};
exports.ListForeignComponent = ListForeignComponent;
//# sourceMappingURL=ListForeignComponent.js.map