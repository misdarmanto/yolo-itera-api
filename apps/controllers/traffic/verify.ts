import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { TrafficAttributes, TrafficModel } from "../../models/traffic";
import { UserModel } from "../../models/users";
import { VehicleModel } from "../../models/vehicles";
import { generateDateTime } from "../../utilities";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";

interface IBodyRequestModel {
	plateNumber: string;
	rfidCard: string;
	rfidLongDistance: string;
	vehicleImage: string;
}

export const verifyVehicle = async (req: any, res: Response) => {
	const bodyRequest = <IBodyRequestModel>req.body;

	try {
		const vehicle = await VehicleModel.findOne({
			where: {
				deleted: { [Op.eq]: 0 },
				plateNumber: { [Op.eq]: bodyRequest.plateNumber },
			},
			include: {
				model: UserModel,
				where: {
					deleted: { [Op.eq]: 0 },
					rfid: { [Op.eq]: bodyRequest.rfidCard },
				},
			},
		});

		if (!vehicle) {
			const message =
				"Jenis kendaraan tidak ditemukan. Silahkan lakukan pendaftaran terlebih dahulu.";
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.NOT_FOUND).json(response);
		}

		const checkTraffic = await TrafficModel.findOne({
			where: {
				deleted: { [Op.eq]: 0 },
				vehicleId: { [Op.eq]: vehicle.id },
				userId: { [Op.eq]: vehicle.userId },
				checkOut: { [Op.eq]: "waiting" },
			},
		});

		if (!checkTraffic) {
			const data = <TrafficAttributes>{
				userId: vehicle.userId,
				vehicleId: vehicle.id,
				checkIn: generateDateTime(),
				checkOut: "waiting",
				photo: bodyRequest.vehicleImage,
			};
			const result = await TrafficModel.create(data);
			const response = <ResponseDataAttributes>ResponseData.default;
			response.data = { message: "succsess" };
			return res.status(StatusCodes.CREATED).json(response);
		}

		await TrafficModel.update(
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
		response.data = { message: "succsess" };
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
