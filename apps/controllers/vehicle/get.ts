import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { VehicleAttributes, VehicleModel } from "../../models/vehicles";
import { Pagination } from "../../utilities/pagination";
import { UserModel } from "../../models/users";
import { requestChecker } from "../../utilities/requestChecker";

export const getListVehicle = async (req: any, res: Response) => {
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
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};

export const getSingleVehicle = async (req: any, res: Response) => {
	const query = <VehicleAttributes>req.query;

	const emptyField = requestChecker({
		requireList: ["id"],
		requestData: query,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const vehicle = await VehicleModel.findOne({
			where: { deleted: { [Op.eq]: 0 }, id: { [Op.eq]: req.query.id } },
		});
		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = vehicle;
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
