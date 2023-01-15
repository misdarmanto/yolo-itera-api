import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseData, ResponseDataAttributes } from "../utilities/response";

export const index = async (req: Request, res: Response) => {
	try {
		const data = { aboutMe: "welcome to yolo itera API" };
		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = data;
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
