import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { TrafficsAttributes, TrafficsModel } from "../models/traffics";
import { UserAttributes, UserModel } from "../models/users";
import { VehicleModel } from "../models/vehicles";
import { Pagination } from "../utilities/pagination";
import { ResponseData, ResponseDataAttributes } from "../utilities/response";

const createTraffic = async (req: any, res: Response) => {
    const body = <TrafficsAttributes>req.body;
    if (!body.vehicleId || !body.userId || !body.photo || !body.checkIn || !body.checkOut) {
        const message = "Permintaan tidak lengkap.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        await TrafficsModel.create(body);
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

const getSingleTrafic = async (req: any, res: Response) => {
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

const getListTraffics = async (req: any, res: Response) => {
    try {
        const page = new Pagination(+req.query.page || 0, +req.query.size || 10);
        const users = await UserModel.findAndCountAll({
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

const updateTraffic = async (req: any, res: Response) => {
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

const deleteTraffic = async (req: any, res: Response) => {
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

const verifyVehicle = async (req: any, res: Response) => {
    if (!req.body.plate_number || !req.body.rfid || !req.body.photo) {
        const message = "Permintaan tidak lengkap.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const vehicle = await VehicleModel.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                plateNumber: { [Op.eq]: req.body.plate_number },
            },
            include: {
                model: UserModel,
                where: {
                    deleted: { [Op.eq]: 0 },
                    rfid: { [Op.eq]: req.body.rfid },
                },
            },
        });

        if (!vehicle) {
            const message = "Jenis kendaraan tidak ditemukan. Silahkan lakukan pendaftaran terlebih dahulu.";
            const response = <ResponseDataAttributes>ResponseData.error(message);
            return res.status(StatusCodes.NOT_FOUND).json(response);
        }

        const checkTraffics = await TrafficsModel.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                vehicleId: { [Op.eq]: vehicle.id },
                userId: { [Op.eq]: vehicle.userId },
                checkOut: { [Op.eq]: "waiting" },
            },
        });

        const date = new Date()
        if (!checkTraffics) {
            const data = <TrafficsAttributes>{
                userId: vehicle.userId,
                vehicleId: vehicle.id,
                checkIn: date.toLocaleDateString(),
                checkOut: "waiting",
                photo: req.body.photo
            };
            const result = await TrafficsModel.create(data);
            const response = <ResponseDataAttributes>ResponseData.default;
            response.data = result;
            return res.status(StatusCodes.OK).json(response);
        }

        const traffics = await TrafficsModel.update(
            { checkOut: date.toLocaleDateString() },
            {
                where: {
                    vehicleId: { [Op.eq]: vehicle.id },
                    userId: { [Op.eq]: vehicle.userId },
                    checkOut: { [Op.eq]: "waiting" },
                },
            }
        );
        const response = <ResponseDataAttributes>ResponseData.default;
        response.data = traffics;
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses. Laporkan kendala ini.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

export const TRAFFICS = {
    list: getListTraffics,
    single: getSingleTrafic,
    delete: deleteTraffic,
    verify: verifyVehicle,
};
