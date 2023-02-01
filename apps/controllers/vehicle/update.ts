import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { VehicleAttributes, VehicleModel } from "../../models/vehicles";
import { requestChecker } from "../../utilities/requestChecker";

export const updateVehicle = async (req: any, res: Response) => {
	const body = <VehicleAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["id"],
		requestData: body,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
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
		response.data = "vehicle has been updated.";
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
