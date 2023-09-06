import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { VehicleAttributes, VehicleModel } from "../../models/vehicles";
import { requestChecker } from "../../utilities/requestChecker";

export const updateVehicle = async (req: any, res: Response) => {
	const requestBody = <VehicleAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["vehicleId"],
		requestData: requestBody,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const vehicle = await VehicleModel.findOne({
			where: {
				deleted: { [Op.eq]: 0 },
				vehicleId: {
					[Op.eq]: requestBody.vehicleId,
				},
			},
		});

		if (!vehicle) {
			const message = `vehicle not found!`;
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.NOT_FOUND).json(response);
		}

		const newData = {
			...(requestBody.vehicleName && { vehicleName: requestBody.vehicleName }),
			...(requestBody.vehiclePlateNumber && {
				vehiclePlateNumber: requestBody.vehiclePlateNumber,
			}),
			...(requestBody.vehicleType && { vehicleType: requestBody.vehicleType }),
			...(requestBody.vehicleUserId && {
				vehicleUserId: requestBody.vehicleUserId,
			}),
			...(requestBody.vehicleColor && { vehicleColor: requestBody.vehicleColor }),
			...(requestBody.vehiclePhoto && { vehiclePhoto: requestBody.vehiclePhoto }),
		};

		await VehicleModel.update(newData, {
			where: { id: { [Op.eq]: requestBody.id } },
		});

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
