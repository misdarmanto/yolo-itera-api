import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { TrafficsModel } from "../../models/traffics";
import { UserModel } from "../../models/users";
import { VehicleModel } from "../../models/vehicles";
import { Pagination } from "../../utilities/pagination";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";

export const getListTraffics = async (req: any, res: Response) => {
	try {
		const page = new Pagination(+req.query.page || 0, +req.query.size || 10);

		const includeModels = [
			{
				model: VehicleModel,
				where: {
					deleted: { [Op.eq]: 0 },
					...(req.query.search && {
						[Op.or]: [{ name: { [Op.like]: `%${req.query.search}%` } }],
					}),
					...(req.query.plate && {
						[Op.or]: [{ plateNumber: { [Op.like]: `%${req.query.plate}%` } }],
					}),
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
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};

export const getSingleTrafic = async (req: any, res: Response) => {
	try {
		const user = await UserModel.findOne({
			where: { deleted: { [Op.eq]: 0 }, id: { [Op.eq]: req.query.id } },
		});
		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = user;
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
