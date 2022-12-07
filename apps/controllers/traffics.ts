import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { TrafficsAttributes, TrafficsModel } from "../models/traffics";
import { UserAttributes, UserModel } from "../models/users";
import { VehicleModel } from "../models/vehicles";
import { generateDateTime } from "../utilities";
import { Pagination } from "../utilities/pagination";
import { ResponseData, ResponseDataAttributes } from "../utilities/response";

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

        const includeModels = [
            {
                model: VehicleModel,
                where: {
                    deleted: { [Op.eq]: 0 },
                    // ...(req.query.search && {
                    //     [Op.or]: [{ plateNumber: { [Op.like]: `%${req.query.search}%` } }],
                    // }),
                },
                attributes: ["name", "plateNumber", "type", "color", "photo", "stnk"],
            },
            {
                model: UserModel,
                where: {
                    deleted: { [Op.eq]: 0 },
                    ...(req.query.search && {
                        [Op.or]: [{ name: { [Op.like]: `%${req.query.search}%` } }],
                    }),
                },
                attributes: ["name", "rfid", "photo"],
            },
        ];

        const traffics = await TrafficsModel.findAndCountAll({
            where: { deleted: { [Op.eq]: 0 } },
            order: [["id", "desc"]],
            ...(req.query.pagination == "true" && {
                limit: page.limit,
                offset: page.offset,
            }),
            include: includeModels,
        });
        const response = <ResponseDataAttributes>ResponseData.default;
        response.data = page.data(traffics);
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.log(error);
        const message = "Tidak dapat memproses permintaan. Laporkan kendala ini.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

const verifyVehicle = async (req: any, res: Response) => {
    if (!req.header("x-plate-number") || !req.header("x-rfid") || !req.body.photo) {
        const message = "Permintaan tidak lengkap.";
        const response = <ResponseDataAttributes>ResponseData.error(message);
        return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    try {
        const where = {
            deleted: { [Op.eq]: 0 },
            plateNumber: { [Op.eq]: req.header("x-plate-number") },
        };

        const includeModel = {
            model: UserModel,
            where: {
                deleted: { [Op.eq]: 0 },
                rfid: { [Op.eq]: req.header("x-rfid") },
            },
        };
        const vehicle = await VehicleModel.findOne({ where: where, include: includeModel });

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

        if (!checkTraffics) {
            const data = <TrafficsAttributes>{
                userId: vehicle.userId,
                vehicleId: vehicle.id,
                checkIn: generateDateTime(),
                checkOut: "waiting",
                photo: req.body.photo,
            };
            const result = await TrafficsModel.create(data);
            const response = <ResponseDataAttributes>ResponseData.default;
            response.data = result;
            return res.status(StatusCodes.OK).json(response);
        }

        const traffics = await TrafficsModel.update(
            { checkOut: generateDateTime() },
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
    verify: verifyVehicle,
};
