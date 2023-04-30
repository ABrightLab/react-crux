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
exports.PaginationComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const SelectComponent_1 = require("./SelectComponent");
let PaginationComponent = class PaginationComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.pageSelectField = {
            style: {
                hideLabel: true
            },
            foreign: {
                modelName: "pageSizes",
                key: "typeId",
                title: "title",
            }
        };
    }
    render() {
        return React.createElement("div", { style: { marginBottom: 10, textAlign: "right" } },
            React.createElement("button", { style: { marginRight: 10 }, className: "btn btn-default btn-xs", disabled: this.isPrevDisabled(), onClick: this.props.prev }, "Prev"),
            React.createElement("span", { className: " heading", style: { marginLeft: 10, marginRight: 20 } }, this.getPageNumber()),
            React.createElement("button", { style: { marginRight: 10 }, className: " btn btn-default btn-xs", disabled: this.isNextDisabled(), onClick: this.props.next }, "Next"),
            React.createElement("span", { className: "heading", style: { marginRight: 10 } }, "Page Size: "),
            React.createElement("span", { style: { display: "inline-block", marginRight: 5 } },
                React.createElement(SelectComponent_1.SelectComponent, { field: this.pageSelectField, readonly: false, additionalModels: { pageSizes: this.getPageSizes() }, modelChanged: this.handlePageSelect, currentModel: this.props.item.paginate.currentPageSize.toString(), showTitle: false, parentModel: "" })));
    }
    getPageSizes() {
        return this.props.dataconstant.allowedPageSizes.map((pageSize) => {
            return {
                typeId: pageSize.toString(),
                title: pageSize
            };
        });
    }
    handlePageSelect(field, pageSize) {
        this.props.paginate(Number(pageSize));
    }
    isNextDisabled() {
        return Math.ceil(this.props.metadata.totalCount / this.props.item.paginate.currentPageSize) - this.props.item.paginate.currentPage === 0;
    }
    isPrevDisabled() {
        return this.props.item.paginate.currentPage === 1;
    }
    getPageNumber() {
        return `Page: ${this.props.item.paginate.currentPage} / ${Math.ceil(this.props.metadata.totalCount / this.props.item.paginate.currentPageSize)}`;
    }
};
PaginationComponent = __decorate([
    autobind_decorator_1.default
], PaginationComponent);
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=PaginationComponent.js.map