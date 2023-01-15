import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { AdminModel } from "../../models/admin";
import { Pagination } from "../../utilities/pagination";
import { ResponseData, ResponseDataAttributes } from "../../utilities/response";

export const getAdminList = async (req: any, res: Response) => {
	try {
		const page = new Pagination(+req.query.page || 0, +req.query.size || 10);
		const admin = await AdminModel.findAndCountAll({
			where: {
				deleted: { [Op.eq]: 0 },
				...(req.query.search && {
					[Op.or]: [
						{ name: { [Op.like]: `%${req.query.search}%` } },
						{ email: { [Op.like]: `%${req.query.search}%` } },
					],
				}),
			},
			order: [["id", "desc"]],
			...(req.query.pagination == "true" && {
				limit: page.limit,
				offset: page.offset,
			}),
			attributes: ["name", "email", "role", "photo"],
		});

		const response = <ResponseDataAttributes>ResponseData.default;
		response.data = page.data(admin);
		return res.status(StatusCodes.OK).json(response);
	} catch (error: any) {
		console.log(error.message);
		const message = `unable to process request! error ${error.message}`;
		const response = <ResponseDataAttributes>ResponseData.error(message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
