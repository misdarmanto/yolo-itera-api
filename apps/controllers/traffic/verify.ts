import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { TrafficAttributes, TrafficModel } from "../../models/traffic";
import { UserModel } from "../../models/users";
import { VehicleModel } from "../../models/vehicles";
import { v4 as uuidv4 } from "uuid";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";

interface IBodyRequestModel {
	plateNumber: string;
	rfidCard: string;
	rfidVehicle: string;
	vehicleImage: string;
}

export const verifyVehicle = async (req: any, res: Response) => {
	const bodyRequest = <IBodyRequestModel>req.body;

	try {
		const vehicle = await VehicleModel.findOne({
			where: {
				deleted: { [Op.eq]: 0 },
				vehiclePlateNumber: { [Op.eq]: bodyRequest.plateNumber },
			},
		});

		const user = await UserModel.findOne({
			where: {
				deleted: { [Op.eq]: 0 },
				userRfidCard: { [Op.eq]: bodyRequest.rfidCard },
			},
		});

		const data = <TrafficAttributes>{
			trafficId: uuidv4(),
			trafficUserName: user?.userName,
			trafficVehicleName: vehicle?.vehicleName,
			trafficVehicleType: vehicle?.vehicleType,
			trafficVehicleColor: vehicle?.vehicleColor,
			trafficUserRfidCard:
				bodyRequest.rfidCard === "" ? null : bodyRequest.rfidCard,
			trafficVehicleRfid:
				bodyRequest.rfidVehicle === "" ? null : bodyRequest.rfidVehicle,
			trafficVehicleImage:
				bodyRequest.vehicleImage === "" ? null : bodyRequest.vehicleImage,
			trafficVehiclePlateNumber:
				bodyRequest.plateNumber === "" ? null : bodyRequest.plateNumber,
		};
		await TrafficModel.create(data);

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
