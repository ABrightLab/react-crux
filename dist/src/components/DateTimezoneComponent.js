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
exports.DateTimezoneComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const react_datetime_1 = __importDefault(require("react-datetime"));
const TimezoneComponent_1 = require("./TimezoneComponent");
const TitleComponent_1 = require("./TitleComponent");
const moment = require("moment-timezone");
let DateTimezoneComponent = class DateTimezoneComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = (selected) => {
            if (selected === this.state.currentDateTime) {
                this.setState({ dateTime: selected, isValueChanged: false });
            }
            else {
                this.setState({ dateTime: selected, isValueChanged: true });
            }
            if (moment(selected).isValid()) {
                moment.tz.setDefault(this.state.timezone);
                this.props.modelChanged(this.props.field, { date: selected, timezone: this.state.timezone });
            }
            else {
                this.props.modelChanged(this.props.field, undefined);
            }
        };
        this.handleTimezoneChange = (field, timezone) => {
            if (timezone === this.state.currentTimeZone) {
                this.setState({ dateTime: timezone, isValueChanged: false });
            }
            else {
                this.setState({ dateTime: timezone, isValueChanged: true });
            }
            this.setState({ timezone, dateTime: moment(this.state.dateTime).tz(timezone), isValueChanged: true });
            this.props.modelChanged(this.props.field, { date: this.state.dateTime, timezone });
        };
        const timezone = props.currentModel && props.currentModel.timezone || "Asia/Kolkata";
        moment.tz.setDefault(timezone);
        this.state = {
            interval: 30,
            dateTime: props.currentModel ? moment(props.currentModel.date) : undefined,
            timezone: timezone,
            isValueChanged: false,
            currentDateTime: props.currentModel ? moment(props.currentModel.date) : undefined,
            currentTimeZone: props.currentModel ? moment(props.currentModel.date) : undefined,
        };
    }
    render() {
        return (React.createElement("div", { style: { display: "flex" } },
            React.createElement("div", { style: { display: "flex", flexDirection: "column", width: "250px" } },
                React.createElement(TitleComponent_1.TitleComponent, { modalType: this.props.modalType, field: this.props.field, isValueChanged: this.state.isValueChanged }),
                React.createElement(react_datetime_1.default, { value: this.state.dateTime, dateFormat: "LL", onChange: this.handleChange, utc: false, timeFormat: "HH:mm", inputProps: { placeholder: "Select " + this.props.field.title, disabled: this.props.readonly, readOnly: true } })),
            React.createElement(TimezoneComponent_1.TimezoneComponent, { currentModel: this.state.timezone, modelChanged: this.handleTimezoneChange, field: this.props.field, additionalModels: this.props.additionalModels, parentModel: this.props.parentModel })));
    }
};
DateTimezoneComponent = __decorate([
    autobind_decorator_1.default
], DateTimezoneComponent);
exports.DateTimezoneComponent = DateTimezoneComponent;
//# sourceMappingURL=DateTimezoneComponent.js.map