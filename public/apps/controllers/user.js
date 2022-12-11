"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const users_1 = require("../models/users");
const vehicles_1 = require("../models/vehicles");
const pagination_1 = require("../utilities/pagination");
const response_1 = require("../utilities/response");
const getListUsers = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(+req.query.page || 0, +req.query.size || 10);
        const whereClause = {
            deleted: { [sequelize_1.Op.eq]: 0 },
            ...(req.query.search && {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.like]: `%${req.query.search}%` } },
                    { email: { [sequelize_1.Op.like]: `%${req.query.search}%` } },
                ],
            }),
        };
        const users = await users_1.UserModel.findAndCountAll({
            where: whereClause,
            order: [["id", "desc"]],
            ...(req.query.pagination == "true" && {
                limit: page.limit,
                offset: page.offset,
            }),
            include: vehicles_1.VehicleModel,
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
const createUser = async (req, res) => {
    const body = req.body;
    if (!body.name || !body.email || !body.phone) {
        const message = "Permintaan tidak lengkap.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const user = await users_1.UserModel.findOne({
            raw: true,
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                email: { [sequelize_1.Op.eq]: body.email },
            },
        });
        if (user) {
            const message = "User telah terdaftar silahkan buat yang baru.";
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        body.rfid = Math.floor(Math.random() * 10000000);
        await users_1.UserModel.create(body);
        const response = response_1.ResponseData.default;
        response.data = "registration sucsess";
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
const getSingleUser = async (req, res) => {
    if (!req.query.id) {
        const message = "Permintaan tidak lengkap.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
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
const updateUser = async (req, res) => {
    const body = req.body;
    if (!body.id) {
        const message = "Permintaan tidak lengkap.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const newData = {
            ...(body.name && { name: body.name }),
            ...(body.email && { email: body.email }),
            ...(body.registerAs && { registerAs: body.registerAs }),
            ...(body.phone && { type: body.phone }),
            ...(body.photo && { photo: body.photo }),
            ...(body.photoIdentity && { photoIdentity: body.photoIdentity }),
        };
        await users_1.UserModel.update(newData, { where: { id: { [sequelize_1.Op.eq]: body.id } } });
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
const deleteUser = async (req, res) => {
    const query = req.query;
    if (!query.id) {
        const message = "Permintaan tidak lengkap.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const vehicle = await users_1.UserModel.update({ deleted: 1 }, { where: { id: { [sequelize_1.Op.eq]: query.id } } });
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
exports.USER = {
    list: getListUsers,
    single: getSingleUser,
    create: createUser,
    update: updateUser,
    delete: deleteUser,
};
