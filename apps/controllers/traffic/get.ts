import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { TrafficAttributes, TrafficModel } from "../../models/traffic";
import { Pagination } from "../../utilities/pagination";
import { requestChecker } from "../../utilities/requestChecker";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";

export const getListTraffic = async (req: any, res: Response) => {
	try {
		const page = new Pagination(+req.query.page || 0, +req.query.size || 10);
		const traffic = await TrafficModel.findAndCountAll({
			where: {
				deleted: { [Op.eq]: 0 },
				...(req.query.search && {
					[Op.or]: [
						{
							trafficUserName: {
								[Op.like]: `%${req.query.search}%`,
							},
						},
						{ trafficVehicleName: { [Op.like]: `%${req.query.search}%` } },
						{
							trafficVehiclePlateNumber: {
								[Op.like]: `%${req.query.search}%`,
							},
						},
					],
				}),
			},
			order: [["id", "desc"]],
			...(req.query.pagination == "true" && {
				limit: page.limit,
				offset: page.offset,
			}),
		});

		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = page.data(traffic);
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};

export const getSingleTraffic = async (req: any, res: Response) => {
	const requestParams = <TrafficAttributes>req.params;
	const emptyField = requestChecker({
		requireList: ["trafficId"],
		requestData: requestParams,
	});

	if (emptyField) {
		const message = `invalid request parameter! require (${emptyField})`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.BAD_REQUEST).json(response);
	}

	try {
		const traffic = await TrafficModel.findOne({
			where: {
				deleted: { [Op.eq]: 0 },
				trafficId: { [Op.eq]: requestParams.trafficId },
			},
		});

		if (!traffic) {
			const message = "traffic not found";
			const response = <ResponseDataAttributes>ResponseData.error(message);
			return res.status(StatusCodes.NOT_FOUND).json(response);
		}

		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = traffic;
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
