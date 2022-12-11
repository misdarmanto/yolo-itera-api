import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { UserAttributes, UserModel } from "../models/users";
import { VehicleModel } from "../models/vehicles";
import { Pagination } from "../utilities/pagination";
import { ResponseData, ResponseDataAttributes } from "../utilities/response";

const getListUsers = async (req: any, res: Response) => {
    try {
        const page = new Pagination(+req.query.page || 0, +req.query.size || 10);
        const whereClause = {
            deleted: { [Op.eq]: 0 },
            ...(req.query.search && {
                [Op.or]: [
                    { name: { [Op.like]: `%${req.query.search}%` } },
                    { email: { [Op.like]: `%${req.query.search}%` } },
                ],
            }),
        };
        const users = await UserModel.findAndCountAll({
            where: whereClause,
            order: [["id", "desc"]],
            ...(req.query.pagination == "true" && {
                limit: page.limit,
                offset: page.offset,
            }),
            include: VehicleModel,
        });
        const response = <ResponseDataAttributes>ResponseData.default;
        response.data = page.data(users);
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses permintaan. Laporkan kendala ini.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

const createUser = async (req: any, res: Response) => {
    const body = <UserAttributes>req.body;
    if (!body.name || !body.email || !body.phone) {
        const message = "Permintaan tidak lengkap.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const user = await UserModel.findOne({
            raw: true,
            where: {
                deleted: { [Op.eq]: 0 },
                email: { [Op.eq]: body.email },
            },
        });

        if (user) {
            const message = "User telah terdaftar silahkan buat yang baru.";
            const response = <ResponseDataAttributes>ResponseData.error(message);
            return res.status(StatusCodes.BAD_REQUEST).json(response);
        }

        body.rfid = Math.floor(Math.random() * 10000000);
        await UserModel.create(body);
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

const getSingleUser = async (req: any, res: Response) => {
    if (!req.query.id) {
        const message = "Permintaan tidak lengkap.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    try {
        const user = await UserModel.findOne({
            where: { deleted: { [Op.eq]: 0 }, id: { [Op.eq]: req.query.id } },
        });
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

const updateUser = async (req: any, res: Response) => {
    const body = <UserAttributes>req.body;
    if (!body.id) {
        const message = "Permintaan tidak lengkap.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const newData = <UserAttributes>{
            ...(body.name && { name: body.name }),
            ...(body.email && { email: body.email }),
            ...(body.registerAs && { registerAs: body.registerAs }),
            ...(body.phone && { type: body.phone }),
            ...(body.photo && { photo: body.photo }),
            ...(body.photoIdentity && { photoIdentity: body.photoIdentity }),
        };

        await UserModel.update(newData, { where: { id: { [Op.eq]: body.id } } });
        const response = <ResponseDataAttributes>ResponseData.default;
        response.data = "berhasil di rubah";
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

const deleteUser = async (req: any, res: Response) => {
    const query = <UserAttributes>req.query;
    if (!query.id) {
        const message = "Permintaan tidak lengkap.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const vehicle = await UserModel.update({ deleted: 1 }, { where: { id: { [Op.eq]: query.id } } });
        const response = <ResponseDataAttributes>ResponseData.default;
        response.data = vehicle;
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

export const USER = {
    list: getListUsers,
    single: getSingleUser,
    create: createUser,
    update: updateUser,
    delete: deleteUser,
};
