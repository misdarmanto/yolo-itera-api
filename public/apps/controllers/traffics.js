"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRAFFICS = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const traffics_1 = require("../models/traffics");
const users_1 = require("../models/users");
const vehicles_1 = require("../models/vehicles");
const utilities_1 = require("../utilities");
const pagination_1 = require("../utilities/pagination");
const response_1 = require("../utilities/response");
const getSingleTrafic = async (req, res) => {
    try {
        const user = await users_1.UserModel.findOne({
            where: { deleted: { [sequelize_1.Op.eq]: 0 }, id: { [sequelize_1.Op.eq]: req.query.id } },
        });
        const response = response_1.ResponseData.default;
        response.data = user;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
const getListTraffics = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(+req.query.page || 0, +req.query.size || 10);
        const includeModels = [
            {
                model: vehicles_1.VehicleModel,
                where: {
                    deleted: { [sequelize_1.Op.eq]: 0 },
                    // ...(req.query.search && {
                    //     [Op.or]: [{ plateNumber: { [Op.like]: `%${req.query.search}%` } }],
                    // }),
                },
                attributes: ["name", "plateNumber", "type", "color", "photo", "stnk"],
            },
            {
                model: users_1.UserModel,
                where: {
                    deleted: { [sequelize_1.Op.eq]: 0 },
                    ...(req.query.search && {
                        [sequelize_1.Op.or]: [{ name: { [sequelize_1.Op.like]: `%${req.query.search}%` } }],
                    }),
                },
                attributes: ["name", "rfid", "photo"],
            },
        ];
        const traffics = await traffics_1.TrafficsModel.findAndCountAll({
            where: { deleted: { [sequelize_1.Op.eq]: 0 } },
            order: [["id", "desc"]],
            ...(req.query.pagination == "true" && {
                limit: page.limit,
                offset: page.offset,
            }),
            include: includeModels,
        });
        const response = response_1.ResponseData.default;
        response.data = page.data(traffics);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses permintaan. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
const verifyVehicle = async (req, res) => {
    if (!req.header("x-plate-number") || !req.header("x-rfid") || !req.body.photo) {
        const message = "Permintaan tidak lengkap.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const where = {
            deleted: { [sequelize_1.Op.eq]: 0 },
            plateNumber: { [sequelize_1.Op.eq]: req.header("x-plate-number") },
        };
        const includeModel = {
            model: users_1.UserModel,
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                rfid: { [sequelize_1.Op.eq]: req.header("x-rfid") },
            },
        };
        const vehicle = await vehicles_1.VehicleModel.findOne({ where: where, include: includeModel });
        if (!vehicle) {
            const message = "Jenis kendaraan tidak ditemukan. Silahkan lakukan pendaftaran terlebih dahulu.";
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        const checkTraffics = await traffics_1.TrafficsModel.findOne({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                vehicleId: { [sequelize_1.Op.eq]: vehicle.id },
                userId: { [sequelize_1.Op.eq]: vehicle.userId },
                checkOut: { [sequelize_1.Op.eq]: "waiting" },
            },
        });
        if (!checkTraffics) {
            const data = {
                userId: vehicle.userId,
                vehicleId: vehicle.id,
                checkIn: (0, utilities_1.generateDateTime)(),
                checkOut: "waiting",
                photo: req.body.photo,
            };
            const result = await traffics_1.TrafficsModel.create(data);
            const response = response_1.ResponseData.default;
            response.data = result;
            return res.status(http_status_codes_1.StatusCodes.OK).json(response);
        }
        const traffics = await traffics_1.TrafficsModel.update({ checkOut: (0, utilities_1.generateDateTime)() }, {
            where: {
                vehicleId: { [sequelize_1.Op.eq]: vehicle.id },
                userId: { [sequelize_1.Op.eq]: vehicle.userId },
                checkOut: { [sequelize_1.Op.eq]: "waiting" },
            },
        });
        const response = response_1.ResponseData.default;
        response.data = traffics;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.TRAFFICS = {
    list: getListTraffics,
    single: getSingleTrafic,
    verify: verifyVehicle,
};
