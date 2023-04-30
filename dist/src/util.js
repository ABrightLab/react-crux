"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReadOnly = exports.getAdditionalModels = exports.getAdditionalModelsSingle = void 0;
const lodash_1 = require("lodash");
function getAdditionalModelsSingle(field) {
    if (field.type === "dynamicTypeahead" || field.type === "dynamicMultiselect")
        return [];
    if (field.modelName)
        return [field.modelName];
    if (field.additionalModelsOverride)
        return field.additionalModelsOverride;
    if (field.foreign && field.foreign.modelName)
        return [field.foreign.modelName];
    if (field.type === "nested")
        return getAdditionalModels(field);
    if (field.type === "iterable" && field.iterabletype)
        return getAdditionalModelsSingle(field.iterabletype);
    return [];
}
exports.getAdditionalModelsSingle = getAdditionalModelsSingle;
function getAdditionalModels(parent) {
    const result = (0, lodash_1.flatten)((0, lodash_1.map)(parent.fields, (field) => getAdditionalModelsSingle(field)));
    const filtered = (0, lodash_1.filter)(result, (model) => model && model !== "" && !(0, lodash_1.isEmpty)(model));
    return (0, lodash_1.uniq)((parent.modelName) ? (0, lodash_1.concat)(filtered, parent.modelName) : filtered);
}
exports.getAdditionalModels = getAdditionalModels;
function getReadOnly(readonly, currentModel) {
    if (typeof readonly === "function") {
        return readonly(currentModel) === true;
    }
    return readonly === true;
}
exports.getReadOnly = getReadOnly;
//# sourceMappingURL=util.js.map