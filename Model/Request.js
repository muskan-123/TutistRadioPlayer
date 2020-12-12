import { Method } from "../Constants/Enum";
import { exp } from "react-native-reanimated";

class Request {
    constructor(url) {
        this._url = url;
        // this._method = method;
        // this._headers = headers;
        // this._body = body;
    }

    get url() {
        return this._url;
    }
    set url(value) {
        this._url = value;
    }

    get method() {
        return this._method;
    }
    set method(value) {
        this._method = value;
    }

    get headers() {
        return this._headers;
    }
    set headers(value) {
        this._headers = value;
    }

    get body() {
        return this._body;
    }
    set body(value) {
        this._body = value;
    }

    get abort() {
        return this._abort;
    }
    set abort(value) {
        this._abort = value;
    }
}

export default Request;