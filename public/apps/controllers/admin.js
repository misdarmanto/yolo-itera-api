"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const admin_1 = require("../models/admin");
const jwt_1 = require("../utilities/jwt");
const pagination_1 = require("../utilities/pagination");
const response_1 = require("../utilities/response");
const scure_password_1 = require("../utilities/scure_password");
const getListAdmin = async (req, res) => {
    try {
        const page = new pagination_1.Pagination(+req.query.page || 0, +req.query.size || 10);
        const admin = await admin_1.AdminModel.findAndCountAll({
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                ...(req.query.search && {
                    [sequelize_1.Op.or]: [
                        { name: { [sequelize_1.Op.like]: `%${req.query.search}%` } },
                        { email: { [sequelize_1.Op.like]: `%${req.query.search}%` } },
                    ],
                }),
            },
            order: [["id", "desc"]],
            ...(req.query.pagination == "true" && {
                limit: page.limit,
                offset: page.offset,
            }),
            attributes: ["name", "email", "role", "photo"],
        });
        const response = response_1.ResponseData.default;
        response.data = page.data(admin);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses permintaan. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
const adminLogin = async (req, res) => {
    const body = req.body;
    if (!body.email || !body.password) {
        const message = "Permintaan tidak lengkap.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const user = await admin_1.AdminModel.findOne({
            raw: true,
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                [sequelize_1.Op.or]: [{ name: { [sequelize_1.Op.eq]: body.name } }, { email: { [sequelize_1.Op.eq]: body.email } }],
            },
        });
        if (!user) {
            const message = "Akun tidak ditemukan. Silahkan lakukan pendaftaran terlebih dahulu.";
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response);
        }
        if ((0, scure_password_1.hashPassword)(body.password) !== user?.password) {
            const message = "kombinasi email dan password tidak ditemukan";
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response);
        }
        const response = response_1.ResponseData.default;
        response.data = {
            adminId: user.id,
            adminName: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo,
        };
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
const adminRegister = async (req, res) => {
    const body = req.body;
    if (!body.name || !body.password || !body.email || !body.role || !body.photo) {
        const message = "Permintaan tidak lengkap.";
        const response = response_1.ResponseData.error(message);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const admin = await admin_1.AdminModel.findOne({
            raw: true,
            where: {
                deleted: { [sequelize_1.Op.eq]: 0 },
                [sequelize_1.Op.or]: [{ name: { [sequelize_1.Op.eq]: body.name } }, { email: { [sequelize_1.Op.eq]: body.email } }],
            },
        });
        if (admin) {
            const message = "Email telah terdaftar. Silahkan gunakan email lain.";
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        body.password = (0, scure_password_1.hashPassword)(body.password);
        await admin_1.AdminModel.create(body);
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
const adminLogout = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            const message = "invalid token";
            const response = response_1.ResponseData.error(message);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response);
        }
        const user = (0, jwt_1.verifyAccessToken)(token);
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
exports.ADMIN = { login: adminLogin, logout: adminLogout, register: adminRegister, list: getListAdmin };
