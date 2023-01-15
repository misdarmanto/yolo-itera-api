import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyAccessToken } from "../../utilities/jwt";
import { requestChecker } from "../../utilities/requestChecker";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";

export const logout = async (req: any, res: Response) => {
	const emptyField = requestChecker({
		requireList: ["token"],
		requestData: req.body,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const user = verifyAccessToken(req.body.token);
		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = user;
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
