"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATISTIC = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../utilities/response");
const sequelize_1 = require("sequelize");
const vehicles_1 = require("../models/vehicles");
const users_1 = require("../models/users");
const getStatistic = async (req, res) => {
    try {
        const motor = await vehicles_1.VehicleModel.count({
            where: { deleted: { [sequelize_1.Op.eq]: 0 }, type: "motor" },
        });
        const mobil = await vehicles_1.VehicleModel.count({
            where: { deleted: { [sequelize_1.Op.eq]: 0 }, type: "mobil" },
        });
        const users = await users_1.UserModel.count({
            where: { deleted: { [sequelize_1.Op.eq]: 0 } },
        });
        const response = response_1.ResponseData.default;
        response.data = { motor, mobil, users };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.STATISTIC = { all: getStatistic };
