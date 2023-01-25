import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { VehicleAttributes, VehicleModel } from "../../models/vehicles";
import { UserModel } from "../../models/users";
import { requestChecker } from "../../utilities/requestChecker";

export const createVehicle = async (req: any, res: Response) => {
	const body = <VehicleAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["name", "plateNumber", "type", "color", "userId"],
		requestData: body,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
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
			return res.status(StatusCodes.FORBIDDEN).json(response);
		}

		const vehicle = await VehicleModel.create(body);
		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = vehicle;
		return res.status(StatusCodes.CREATED).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
