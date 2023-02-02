import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { VehicleAttributes, VehicleModel } from "../../models/vehicles";
import { requestChecker } from "../../utilities/requestChecker";

export const deleteVehicle = async (req: any, res: Response) => {
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

		if (!vehicle) {
			const message = `vehicle not found!`;
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.NOT_FOUND).json(response);
		}

		await VehicleModel.update({ deleted: 1 }, { where: { id: { [Op.eq]: query.id } } });
		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = "vehicle has been deleted.";
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
