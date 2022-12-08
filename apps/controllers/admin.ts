import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op, UUIDV4 } from "sequelize";
import { AdminAttributes, AdminModel } from "../models/admin";
import { UserAttributes, UserModel } from "../models/users";
import { UserSessionAttributes, UserSessionModel } from "../models/user_sessions";
import { generateAccessToken, verifyAccessToken } from "../utilities/jwt";
import { Pagination } from "../utilities/pagination";
import { ResponseData, ResponseDataAttributes } from "../utilities/response";
import { hashPassword } from "../utilities/scure_password";

const getListAdmin = async (req: any, res: Response) => {
    try {
        const page = new Pagination(+req.query.page || 0, +req.query.size || 10);
        const admin = await AdminModel.findAndCountAll({
            where: {
                deleted: { [Op.eq]: 0 },
                ...(req.query.search && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.search}%` } },
                        { email: { [Op.like]: `%${req.query.search}%` } },
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
        const response = <ResponseDataAttributes>ResponseData.default;
        response.data = page.data(admin);
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses permintaan. Laporkan kendala ini.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

const adminLogin = async (req: any, res: Response) => {
    const body = <AdminAttributes>req.body;
    if (!body.email || !body.password) {
        const message = "Permintaan tidak lengkap.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    try {
        const user = await AdminModel.findOne({
            raw: true,
            where: {
                deleted: { [Op.eq]: 0 },
                [Op.or]: [{ name: { [Op.eq]: body.name } }, { email: { [Op.eq]: body.email } }],
            },
        });

        if (!user) {
            const message = "Akun tidak ditemukan. Silahkan lakukan pendaftaran terlebih dahulu.";
            const response = <ResponseDataAttributes>ResponseData.error(message);
            return res.status(StatusCodes.NOT_FOUND).json(response);
        }

        if (hashPassword(body.password) !== user?.password) {
            const message = "kombinasi email dan password tidak ditemukan";
            const response = <ResponseDataAttributes>ResponseData.error(message);
            return res.status(StatusCodes.UNAUTHORIZED).json(response);
        }

        const response = <ResponseDataAttributes>ResponseData.default;
        response.data = {
            adminId: user.id,
            adminName: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo,
        };
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

const adminRegister = async (req: any, res: Response) => {
    const body = <AdminAttributes>req.body;
    if (!body.name || !body.password || !body.email || !body.role || !body.photo) {
        const message = "Permintaan tidak lengkap.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const admin = await AdminModel.findOne({
            raw: true,
            where: {
                deleted: { [Op.eq]: 0 },
                [Op.or]: [{ name: { [Op.eq]: body.name } }, { email: { [Op.eq]: body.email } }],
            },
        });

        if (admin) {
            const message = "Email telah terdaftar. Silahkan gunakan email lain.";
            const response = <ResponseDataAttributes>ResponseData.error(message);
            return res.status(StatusCodes.BAD_REQUEST).json(response);
        }

        body.password = hashPassword(body.password);
        await AdminModel.create(body);
        const response = <ResponseDataAttributes>ResponseData.default;
        response.data = "registration sucsess";
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

const adminLogout = async (req: any, res: Response) => {
    try {
        const token = req.body.token;

        if (!token) {
            const message = "invalid token";
            const response = <ResponseDataAttributes>ResponseData.error(message);
            return res.status(StatusCodes.BAD_REQUEST).json(response);
        }

        const user = verifyAccessToken(token);
        const response = <ResponseDataAttributes>ResponseData.default;
        response.data = user;
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

export const ADMIN = { login: adminLogin, logout: adminLogout, register: adminRegister, list: getListAdmin };
