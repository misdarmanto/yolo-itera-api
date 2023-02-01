import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { UserAttributes, UserModel } from "../../models/users";
import { requestChecker } from "../../utilities/requestChecker";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";

export const updateUser = async (req: any, res: Response) => {
	const body = <UserAttributes>req.body;

	const emptyField = requestChecker({
		requireList: ["id"],
		requestData: body,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const newData = <UserAttributes>{
			...(body.name && { name: body.name }),
			...(body.email && { email: body.email }),
			...(body.registerAs && { registerAs: body.registerAs }),
			...(body.phone && { type: body.phone }),
			...(body.photo && { photo: body.photo }),
			...(body.photoIdentity && { photoIdentity: body.photoIdentity }),
		};

		await UserModel.update(newData, { where: { id: { [Op.eq]: body.id } } });
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
