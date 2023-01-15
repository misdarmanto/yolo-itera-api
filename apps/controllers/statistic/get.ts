import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { Op } from "sequelize";
import { VehicleModel } from "../../models/vehicles";
import { UserModel } from "../../models/users";

export const getStatistic = async (req: any, res: Response) => {
	try {
		const motor = await VehicleModel.count({
			where: { deleted: { [Op.eq]: 0 }, type: "motor" },
		});
		const mobil = await VehicleModel.count({
			where: { deleted: { [Op.eq]: 0 }, type: "mobil" },
		});
		const users = await UserModel.count({
			where: { deleted: { [Op.eq]: 0 } },
		});

		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = { motor, mobil, users };
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
