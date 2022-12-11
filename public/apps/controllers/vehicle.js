"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VEHICLE = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../utilities/response");
const sequelize_1 = require("sequelize");
const vehicles_1 = require("../models/vehicles");
const pagination_1 = require("../utilities/pagination");
const users_1 = require("../models/users");
const getListVehicle = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(+req.query.page || 0, +req.query.size || 10);
        const users = await vehicles_1.VehicleModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                ...(req.query.search && {
                    [sequelize_1.Op.or]: [{ name: { [sequelize_1.Op.like]: `%${req.query.search}%` } }],
                }),
            },
            include: {
                model: users_1.UserModel,
                attributes: ["name", "rfid"],
            },
            order: [["id", "desc"]],
            ...(req.query.pagination == "true" && {
                limit: page.limit,
                offset: page.offset,
            }),
        });
        const response = response_1.ResponseData.default;
        response.data = page.data(users);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses permintaan. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
const getSingleVehicle = async (req, res) => {
    try {
        const vehicle = await vehicles_1.VehicleModel.findOne({
            where: { deleted: { [sequelize_1.Op.eq]: 0 }, id: { [sequelize_1.Op.eq]: req.query.id } },
        });
        const response = response_1.ResponseData.default;
        response.data = vehicle;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
const createVehicle = async (req, res) => {
    const body = req.body;
    if (!body.name || !body.plateNumber || !body.type || !body.color || !body.userId) {
        const message = "Permintaan tidak lengkap.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const isUsersExis = await users_1.UserModel.findOne({
            where: { deleted: { [sequelize_1.Op.eq]: 0 }, id: { [sequelize_1.Op.eq]: body.userId } },
        });
        if (!isUsersExis) {
            const message = "User belum terdafar, silahkan lakukan registrasi";
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        const vehicle = await vehicles_1.VehicleModel.create(body);
        const response = response_1.ResponseData.default;
        response.data = vehicle;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
const updateVehicle = async (req, res) => {
    const body = req.body;
    if (!body.id) {
        const message = "Permintaan tidak lengkap.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const newData = {
            ...(body.name && { name: body.name }),
            ...(body.plateNumber && { plateNumber: body.plateNumber }),
            ...(body.type && { type: body.type }),
            ...(body.userId && { userId: body.userId }),
            ...(body.color && { color: body.color }),
            ...(body.photo && { photo: body.photo }),
        };
        await vehicles_1.VehicleModel.update(newData, { where: { id: { [sequelize_1.Op.eq]: body.id } } });
        const response = response_1.ResponseData.default;
        response.data = "berhasil di rubah";
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
const deleteVehicle = async (req, res) => {
    const query = req.query;
    if (!query.id) {
        const message = "Permintaan tidak lengkap.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const vehicle = await vehicles_1.VehicleModel.update({ deleted: 1 }, { where: { id: { [sequelize_1.Op.eq]: query.id } } });
        const response = response_1.ResponseData.default;
        response.data = vehicle;
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
exports.VEHICLE = {
    list: getListVehicle,
    create: createVehicle,
    update: updateVehicle,
    delete: deleteVehicle,
    single: getSingleVehicle,
};
