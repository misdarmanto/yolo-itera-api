import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../utilities/response";
import { Op } from "sequelize";
import { VehicleAttributes, VehicleModel } from "../models/mysql/vehicle/vehicle";
import { Pagination } from "../utilities/pagination";
import { UserModel } from "../models/mysql/user/user";

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
      order: [["id", "desc"]],
      ...(req.query.pagination == "true" && {
        limit: page.limit,
        offset: page.offset,
      }),
      include: {
        model: UserModel,
        attributes: ["user_name"],
      },
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
  if (!body.name || !body.plateNumber || !body.type || !body.color) {
    const message = "Permintaan tidak lengkap.";
    const response = <ResponseDataAttributes>ResponseData.error(message);
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
  try {
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
  if (!body.id || !body.plateNumber || !body.type) {
    const message = "Permintaan tidak lengkap.";
    const response = <ResponseDataAttributes>ResponseData.error(message);
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
  try {
    const vehicle = await VehicleModel.update(body, { where: { id: { [Op.eq]: body.id } } });
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
  const body = <VehicleAttributes>req.body;
  if (!body.plateNumber) {
    const message = "Permintaan tidak lengkap.";
    const response = <ResponseDataAttributes>ResponseData.error(message);
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }
  try {
    const vehicle = await VehicleModel.findOne({
      where: { deleted: { [Op.eq]: 0 }, plateNumber: { [Op.eq]: req.query.plateNumber } },
    });

    if (!vehicle) {
      const message = "Jenis kendaraan tidak ditemukan. Silahkan lakukan pendaftaran terlebih dahulu.";
      const response = <ResponseDataAttributes>ResponseData.error(message);
      return res.status(StatusCodes.NOT_FOUND).json(response);
    }

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
  getListVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getSingleVehicle,
  verifyVehicle,
};
