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
exports.ImageUploadComponent = void 0;
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const React = __importStar(require("react"));
const upload = __importStar(require("superagent"));
let Dropzone = require("react-dropzone");
if ("default" in Dropzone) {
    Dropzone = Dropzone.default;
}
let ImageUploadComponent = class ImageUploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.removeFile = () => {
            this.props.modelChanged(this.props.field, undefined);
        };
        this.previewUpload = () => {
            if (this.props.contentType === "video") {
                return React.createElement("video", { width: "240px", height: "200px", controls: true, src: this.getUrl(this.props.currentModel, this.props.field) });
            }
            else if (this.props.contentType === "audio") {
                return React.createElement("audio", { controls: true, src: this.getUrl(this.props.currentModel, this.props.field) });
            }
            return React.createElement("img", { style: { maxWidth: "150px", height: "75px", objectFit: "contain" }, src: this.getUrl(this.props.currentModel, this.props.field) });
        };
        this.state = {
            inProgress: false,
            percentageDone: 0,
            isValueChanged: false,
            previousValue: this.props.currentModel
        };
    }
    onDrop(files, width, height, contentType) {
        this.setState({
            isValueChanged: true
        });
        const formData = new FormData();
        formData.append("images", files[0]);
        if (width) {
            formData.append("width", width);
        }
        if (height) {
            formData.append("height", height);
        }
        let uploadedFileName = '';
        if (this.props.field.dynamicFileNameFn && typeof this.props.field.dynamicFileNameFn === "function") {
            uploadedFileName = this.props.field.dynamicFileNameFn({ parentModel: this.props.parentModel });
        }
        if (uploadedFileName) {
            formData.append("fileName", uploadedFileName);
        }
        this.setState(Object.assign({}, this.state, { inProgress: true }));
        if (this.props.item && this.props.item["contentType"] && this.props.item["contentType"] !== contentType) {
            contentType = this.props.item["contentType"];
        }
        this.setState({
            percentageDone: 0
        });
        upload.post("/content/" + contentType + "/upload/").send(formData)
            .on('progress', (e) => {
            this.setState({
                percentageDone: e.percent.toFixed(2)
            });
        })
            .end((err, res) => {
            this.setState(Object.assign({}, this.state, { inProgress: false }));
            if (res.status !== 200) {
                const data = JSON.parse(res.text);
                alert("Error: " + data.message);
            }
            else {
                const data = JSON.parse(res.text);
                this.props.modelChanged(this.props.field, data.url);
                alert("File uploaded successfully");
            }
        });
    }
    render() {
        const { percentageDone } = this.state;
        return (React.createElement("div", null,
            React.createElement(Dropzone, { style: { width: "140px", textAlign: "center", color: "#E2356F" }, disabled: this.props.readonly, onDrop: (data) => {
                    this.onDrop(data, this.props.field.width, this.props.field.height, this.props.field.contentType);
                }, maxSize: this.props.field.maxUploadSize || Infinity, multiple: true, onDropRejected: (fileRejections) => {
                    const uploadedSize = fileRejections[0].size;
                    if (uploadedSize > this.props.field.maxUploadSize) {
                        alert(`File size exceeded. Limit is ${this.props.field.maxUploadSize / 1000000} mb.`);
                    }
                    else {
                        alert("File rejected. Please try again.");
                    }
                } },
                React.createElement("div", { style: { textAlign: "left", color: "#E2356F" } },
                    "Upload ",
                    this.props.field.title),
                this.state.inProgress &&
                    React.createElement("div", null,
                        React.createElement("img", { src: "./images/loadingGif.gif", style: { width: "112px", textAlign: "center" } }),
                        ",",
                        React.createElement("p", null,
                            percentageDone,
                            " % uploaded")),
                this.props.currentModel &&
                    React.createElement("div", { style: { cursor: "pointer" }, onClick: this.handleImageClick }, this.previewUpload())),
            this.props.currentModel &&
                React.createElement("a", { onClick: this.removeFile, style: { color: "#0000EE", marginLeft: "42px" } }, "Remove")));
    }
    getUrl(url, field) {
        return (field.urlPrefix ? field.urlPrefix : "") + url + (field.urlSuffix ? field.urlSuffix : "");
    }
    handleImageClick(event) {
        event.stopPropagation();
        window.open(this.getUrl(this.props.currentModel, this.props.field));
    }
};
ImageUploadComponent = __decorate([
    autobind_decorator_1.default
], ImageUploadComponent);
exports.ImageUploadComponent = ImageUploadComponent;
//# sourceMappingURL=ImageUploadComponent.js.map