import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { UserAttributes, UserModel } from "../models/mysql/user/user";
import { VehicleModel } from "../models/mysql/vehicle/vehicle";
import { Pagination } from "../utilities/pagination";
import { ResponseData, ResponseDataAttributes } from "../utilities/response";

const info = async (req: any, res: Response) => {
    try {
        const response = <ResponseDataAttributes>ResponseData.default;
        response.data = { message: "succses", user: req.body.user };
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

const list = async (req: any, res: Response) => {
    try {
        const page = new Pagination(+req.query.page || 0, +req.query.size || 10);
        const users = await UserModel.findAndCountAll({
            attributes: ["id", "user_name", "email", "photo", "rfid", "role"],
            where: {
                deleted: { [Op.eq]: 0 },
                ...(req.query.role && {
                    role: { [Op.eq]: req.query.role },
                }),
                ...(req.query.search && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${req.query.search}%` } },
                        { userName: { [Op.like]: `%${req.query.search}%` } },
                    ],
                }),
            },
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

export const ADMIN = { list, info };
