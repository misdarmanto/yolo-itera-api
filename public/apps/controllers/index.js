"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../utilities/response");
const index = async (req, res) => {
    try {
        const data = { aboutMe: "welcome to itera" };
        const response = response_1.ResponseData.default;
        response.data = data;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses permintaan. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.index = index;
