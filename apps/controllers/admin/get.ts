import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { AdminModel } from '../../models/admin'
import { Pagination } from '../../utilities/pagination'
import { requestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'

export const getAdminList = async (req: any, res: Response): Promise<any> => {
  console.log(req.headers)
  const emptyField = requestChecker({
    requireList: ['x-user-id'],
    requestData: req.headers
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const admin = await AdminModel.findAndCountAll({
      where: {
        id: { [Op.not]: req.header('x-user-id') },
        // role: { [Op.eq]: "super admin" },
        deleted: { [Op.eq]: 0 },
        ...(Boolean(req.query.search) && {
          [Op.or]: [
            { name: { [Op.like]: `%${req.query.search}%` } },
            { email: { [Op.like]: `%${req.query.search}%` } }
          ]
        })
      },
      order: [['id', 'desc']],
      ...(req.query.pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      }),
      attributes: ['adminId', 'adminName', 'adminEmail', 'adminRole', 'adminPhoto']
    })

    if (admin === null) {
      const message = 'accsess denied!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.FORBIDDEN).json(response)
    }

    const response = ResponseData.default
    response.data = page.data(admin)
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
