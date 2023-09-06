import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { AdminAttributes, AdminModel } from "../../models/admin";
import { requestChecker } from "../../utilities/requestChecker";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { hashPassword } from "../../utilities/scure_password";

export const login = async (req: any, res: Response) => {
	const requestBody = <AdminAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["adminEmail", "adminPassword"],
		requestData: requestBody,
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
				[Op.or]: [
					{ adminName: { [Op.eq]: requestBody.adminName } },
					{ adminEmail: { [Op.eq]: requestBody.adminEmail } },
				],
			},
		});

		if (!admin) {
			const message =
				"Akun tidak ditemukan. Silahkan lakukan pendaftaran terlebih dahulu!";
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.NOT_FOUND).json(response);
		}

		if (hashPassword(requestBody.adminPassword) !== admin?.adminPassword) {
			const message = "kombinasi email dan password tidak ditemukan!";
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.UNAUTHORIZED).json(response);
		}

		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = {
			adminId: admin.adminId,
			adminName: admin.adminName,
			adminEmail: admin.adminEmail,
			adminRole: admin.adminRole,
			adminPhoto: admin.adminRole,
		};
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
