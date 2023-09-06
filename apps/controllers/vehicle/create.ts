import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { VehicleAttributes, VehicleModel } from "../../models/vehicles";
import { UserModel } from "../../models/users";
import { requestChecker } from "../../utilities/requestChecker";
import { v4 as uuidv4 } from "uuid";

export const createVehicle = async (req: any, res: Response) => {
	const requestBody = <VehicleAttributes>req.body;

	const emptyField = requestChecker({
		requireList: [
			"vehicleName",
			"vehiclePlateNumber",
			"vehicleType",
			"vehicleColor",
			"vehicleUserId",
		],
		requestData: requestBody,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const isUsersExis = await UserModel.findOne({
			where: {
				deleted: { [Op.eq]: 0 },
				userId: { [Op.eq]: requestBody.vehicleUserId },
			},
		});

		if (!isUsersExis) {
			const message = "User belum terdafar, silahkan lakukan registrasi";
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.FORBIDDEN).json(response);
		}

		requestBody.vehicleId = uuidv4();

		await VehicleModel.create(requestBody);
		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = "vehicle has been created.";
		return res.status(StatusCodes.CREATED).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
