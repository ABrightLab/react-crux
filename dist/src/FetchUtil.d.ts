export declare class AuthError extends Error {
    constructor(message: string);
}
export declare class FetchUtil {
    static get(headers?: any): any;
    static post(body: any, headers?: any): any;
    static put(body?: any, headers?: any): any;
    static delete(body?: any, headers?: any): any;
    static parseResponse<T>(response: any): Promise<T>;
    static getFormData(params: Map<string, string>): string;
}
