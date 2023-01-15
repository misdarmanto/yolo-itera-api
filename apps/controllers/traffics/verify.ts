import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { TrafficsAttributes, TrafficsModel } from "../../models/traffics";
import { UserModel } from "../../models/users";
import { VehicleAttributes, VehicleModel } from "../../models/vehicles";
import { generateDateTime } from "../../utilities";
import { requestChecker } from "../../utilities/requestChecker";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";

export const verifyVehicle = async (req: any, res: Response) => {
	const body = <VehicleAttributes>req.body;
	const emptyField = requestChecker({
		requireList: ["x-plate-number", "x-rfid", "photo"],
		requestData: { ...req.body, ...req.headers },
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
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
				photo: body.photo,
			};
			const result = await TrafficsModel.create(data);
			const response = <ResponseDataAttributes>ResponseData.default;
			response.data = result;
			return res.status(StatusCodes.CREATED).json(response);
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
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};