import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../utilities/response";
import { Op } from "sequelize";
import { VehicleAttributes, VehicleModel } from "../models/vehicles";
import { Pagination } from "../utilities/pagination";
import { UserModel } from "../models/users";

const getListVehicle = async (req: any, res: Response) => {
    try {
        const page = new Pagination(+req.query.page || 0, +req.query.size || 10);
        const users = await VehicleModel.findAndCountAll({
            where: {
                deleted: { [Op.eq]: 0 },
                ...(req.query.search && {
                    [Op.or]: [{ name: { [Op.like]: `%${req.query.search}%` } }],
                }),
            },
            include: {
                model: UserModel,
                attributes: ["name", "rfid"],
            },
            order: [["id", "desc"]],
            ...(req.query.pagination == "true" && {
                limit: page.limit,
                offset: page.offset,
            }),
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

const getSingleVehicle = async (req: any, res: Response) => {
    try {
        const vehicle = await VehicleModel.findOne({
            where: { deleted: { [Op.eq]: 0 }, id: { [Op.eq]: req.query.id } },
        });
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

const createVehicle = async (req: any, res: Response) => {
    const body = <VehicleAttributes>req.body;
    if (!body.name || !body.plateNumber || !body.type || !body.color || !body.userId) {
        const message = "Permintaan tidak lengkap.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const isUsersExis = await UserModel.findOne({
            where: { deleted: { [Op.eq]: 0 }, id: { [Op.eq]: body.userId } },
        });

        if (!isUsersExis) {
            const message = "User belum terdafar, silahkan lakukan registrasi";
            const response = <ResponseDataAttributes>ResponseData.error(message);
            return res.status(StatusCodes.BAD_REQUEST).json(response);
        }

        const vehicle = await VehicleModel.create(body);
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

const updateVehicle = async (req: any, res: Response) => {
    const body = <VehicleAttributes>req.body;
    if (!body.id) {
        const message = "Permintaan tidak lengkap.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.BAD_REQUEST).json(response);
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

        await VehicleModel.update(newData, { where: { id: { [Op.eq]: body.id } } });
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

const deleteVehicle = async (req: any, res: Response) => {
    const query = <VehicleAttributes>req.query;
    if (!query.id) {
        const message = "Permintaan tidak lengkap.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const vehicle = await VehicleModel.update({ deleted: 1 }, { where: { id: { [Op.eq]: query.id } } });
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

export const VEHICLE = {
    list: getListVehicle,
    create: createVehicle,
    update: updateVehicle,
    delete: deleteVehicle,
    single: getSingleVehicle,
};
