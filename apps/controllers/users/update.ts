import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { UserAttributes, UserModel } from "../../models/users";
import { requestChecker } from "../../utilities/requestChecker";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";

export const updateUser = async (req: any, res: Response) => {
	const requestBody = <UserAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["userId"],
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
				userId: { [Op.eq]: requestBody.userId },
			},
		});

		if (!user) {
			const message = `user not found!`;
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.NOT_FOUND).json(response);
		}

		const newData = <UserAttributes>{
			...(requestBody.userName && { userName: requestBody.userName }),
			...(requestBody.userEmail && { userEmail: requestBody.userEmail }),
			...(requestBody.userRegisterAs && {
				userRegisterAs: requestBody.userRegisterAs,
			}),
			...(requestBody.userPhoneNumber && { type: requestBody.userPhoneNumber }),
			...(requestBody.userPhoto && { userPhoto: requestBody.userPhoto }),
		};

		await UserModel.update(newData, {
			where: { userId: { [Op.eq]: requestBody.userId } },
		});

		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = "user has been updated.";
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
