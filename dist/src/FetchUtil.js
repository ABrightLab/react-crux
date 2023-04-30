"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchUtil = exports.AuthError = void 0;
class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthError';
    }
}
exports.AuthError = AuthError;
class FetchUtil {
    static get(headers) {
        const concatHeaders = Object.assign({}, {
            Accept: "application/json",
            "Content-Type": "application/json"
        }, headers);
        return {
            method: "GET",
            headers: concatHeaders,
            credentials: "include"
        };
    }
    static post(body, headers) {
        const concatHeaders = Object.assign({}, {
            Accept: "application/json",
            "Content-Type": "application/json"
        }, headers);
        return {
            method: "POST",
            headers: concatHeaders,
            body: JSON.stringify(body),
            credentials: "include"
        };
    }
    static put(body = {}, headers) {
        const concatHeaders = Object.assign({}, {
            Accept: "application/json",
            "Content-Type": "application/json"
        }, headers);
        return {
            method: "PUT",
            headers: concatHeaders,
            body: JSON.stringify(body),
            credentials: "include"
        };
    }
    static delete(body = {}, headers) {
        const concatHeaders = Object.assign({}, {
            Accept: "application/json",
            "Content-Type": "application/json"
        }, headers);
        return {
            method: "DELETE",
            headers: concatHeaders,
            body: JSON.stringify(body),
            credentials: "include"
        };
    }
    static parseResponse(response) {
        try {
            if (response.status >= 200 && response.status <= 299) {
                return response.json().then((x) => {
                    return x;
                });
            }
            else {
                console.error("Status: " + response.status + " StatusText: " + response.statusText);
                if (response.status == 401) {
                    console.error("Call failed with 401, throwing auth error");
                    throw new AuthError(response.status);
                }
                return response.json().then((err) => {
                    console.error("Error message: " + JSON.stringify(err));
                    throw new Error(JSON.stringify(err));
                });
            }
        }
        catch (err) {
            if (err.name === "AuthError") {
                throw err;
            }
            console.error("Status: " + response.status + " StatusText: " + response.statusText);
            console.error("Error message: " + JSON.stringify(err));
            throw new Error(response.statusText);
        }
    }
    static getFormData(params) {
        let respString = undefined;
        params.forEach((value, key) => {
            const newString = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            respString = (respString) ? respString + "&" + newString : newString;
        });
        return respString;
    }
}
exports.FetchUtil = FetchUtil;
//# sourceMappingURL=FetchUtil.js.map