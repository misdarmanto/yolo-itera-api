import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { AdminAttributes, AdminModel } from "../../models/admin";
import { requestChecker } from "../../utilities/requestChecker";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";

export const updateAdmin = async (req: any, res: Response) => {
	const requestBodybody = <AdminAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["adminId"],
		requestData: requestBodybody,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const adminCheck = await AdminModel.findOne({
			where: {
				deleted: { [Op.eq]: 0 },
				adminId: { [Op.eq]: requestBodybody.adminId },
			},
		});

		if (!adminCheck) {
			const message = `Admin not found!`;
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.NOT_FOUND).json(response);
		}

		const newData = <AdminAttributes>{
			...(requestBodybody.adminName && { name: requestBodybody.adminName }),
			...(requestBodybody.adminEmail && { email: requestBodybody.adminEmail }),
			...(requestBodybody.adminRole && { registerAs: requestBodybody.adminRole }),
			...(requestBodybody.adminPassword && { type: requestBodybody.adminPassword }),
		};

		await AdminModel.update(newData, {
			where: { adminId: { [Op.eq]: requestBodybody.adminId } },
		});
		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = "admin has been updated.";
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
