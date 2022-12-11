"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthorization = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../config");
const response_1 = require("../utilities/response");
const useAuthorization = (req, res, next) => {
    try {
        if (!req.header("authorization") || req.header("authorization")?.indexOf("Basic ") === -1) {
            const message = "Missing Authorization.";
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        const base64Credentials = req.header("authorization")?.split(" ")[1];
        const credentials = Buffer.from(base64Credentials || ":", "base64").toString("ascii");
        const [username, password] = credentials.split(":");
        if (username != config_1.CONFIG.authorization.username || password != config_1.CONFIG.authorization.passsword) {
            const message = "Invalid Authorization.";
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
        }
        next();
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses permintaan. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.useAuthorization = useAuthorization;
