import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { TrafficAttributes, TrafficModel } from "../../models/traffic";
import { UserModel } from "../../models/users";
import { VehicleModel } from "../../models/vehicles";
import { v4 as uuidv4 } from "uuid";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import moment from "moment";

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
				[Op.or]: [
					{
						vehiclePlateNumber: { [Op.eq]: bodyRequest.plateNumber },
					},
					{
						vehicleRfid: { [Op.eq]: bodyRequest.rfidVehicle },
					},
				],
			},
		});

		const user = await UserModel.findOne({
			where: {
				deleted: { [Op.eq]: 0 },
				userRfidCard: { [Op.eq]: bodyRequest.rfidCard },
			},
		});

		const payload = <TrafficAttributes>{
			trafficId: uuidv4(),
			trafficUserName: user?.userName || null,
			trafficVehicleName: vehicle?.vehicleName || null,
			trafficVehicleType: vehicle?.vehicleType || null,
			trafficVehicleColor: vehicle?.vehicleColor || null,
			trafficUserRfidCard: user?.userRfidCard || null,
			trafficVehicleRfid: vehicle?.vehicleRfid || null,
			trafficVehiclePlateNumber: vehicle?.vehiclePlateNumber || null,
			trafficVehicleImage:
				bodyRequest.vehicleImage === "" ? null : bodyRequest.vehicleImage,
		};

		const isTrafficExis = await TrafficModel.findOne({
			where: {
				deleted: { [Op.eq]: 0 },
				trafficStatus: { [Op.eq]: "checkIn" },
				...(bodyRequest.plateNumber && {
					trafficVehiclePlateNumber: {
						[Op.eq]: bodyRequest.plateNumber,
					},
				}),
				...(bodyRequest.rfidCard && {
					trafficUserRfidCard: {
						[Op.eq]: bodyRequest.rfidCard,
					},
				}),
				...(bodyRequest.rfidVehicle && {
					trafficVehicleRfid: {
						[Op.eq]: bodyRequest.rfidVehicle,
					},
				}),
			},
		});

		const currentDateTime = moment().add(7, "hours").format("YYYY-MM-DD HH:mm:ss");

		if (isTrafficExis) {
			payload["trafficVehicleCheckOut"] = currentDateTime;
			payload["trafficVehicleCheckIn"] = isTrafficExis.trafficVehicleCheckIn;
			payload["trafficStatus"] = "checkOut";

			isTrafficExis.trafficVehicleCheckOut = currentDateTime;
			isTrafficExis.save();
		} else {
			payload["trafficVehicleCheckIn"] = currentDateTime;
			payload["trafficStatus"] = "checkIn";
		}

		await TrafficModel.create(payload);

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
