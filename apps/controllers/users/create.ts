import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { UserAttributes, UserModel } from "../../models/users";
import { requestChecker } from "../../utilities/requestChecker";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (req: any, res: Response) => {
	const requestBody = <UserAttributes>req.body;

	const emptyField = requestChecker({
		requireList: [
			"userName",
			"userEmail",
			"userRfidCard",
			"userPhoneNumber",
			"userRegisterAs",
			"userPhoto",
		],
		requestData: requestBody,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const user = await UserModel.findOne({
			where: {
				deleted: { [Op.eq]: 0 },
				userEmail: { [Op.eq]: requestBody.userEmail },
			},
		});

		if (user) {
			const message = "User telah terdaftar silahkan buat yang baru.";
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.BAD_REQUEST).json(response);
		}

		requestBody.userId = uuidv4();
		await UserModel.create(requestBody);

		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = "user has been created";
		return res.status(StatusCodes.CREATED).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
