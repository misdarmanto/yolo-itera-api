"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseData = void 0;
const config_1 = require("../config");
exports.ResponseData = {
    error: (message) => {
        return {
            request_param: "",
            status: 'error',
            error_message: message,
            data: null,
            next: "",
            version: { "code": config_1.CONFIG.app_version, "name": config_1.CONFIG.app_semantic }
        };
    },
    default: {
        request_param: "",
        status: 'success',
        error_message: null,
        data: "",
        next: "",
        version: { "code": config_1.CONFIG.app_version, "name": config_1.CONFIG.app_semantic }
    }
};
