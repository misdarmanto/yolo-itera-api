import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { AdminAttributes, AdminModel } from "../../models/admin";
import { requestChecker } from "../../utilities/requestChecker";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { hashPassword } from "../../utilities/scure_password";

export const register = async (req: any, res: Response) => {
	const body = <AdminAttributes>req.body;
	const emptyField = requestChecker({
		requireList: ["name", "email", "password", "role", "photo"],
		requestData: body,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const admin = await AdminModel.findOne({
			raw: true,
			where: {
				deleted: { [Op.eq]: 0 },
				[Op.or]: [{ name: { [Op.eq]: body.name } }, { email: { [Op.eq]: body.email } }],
			},
		});

		if (admin) {
			const message = "Email telah terdaftar. Silahkan gunakan email lain.";
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.BAD_REQUEST).json(response);
		}

		body.password = hashPassword(body.password);
		await AdminModel.create(body);

		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = "registration sucsess";
		return res.status(StatusCodes.CREATED).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
