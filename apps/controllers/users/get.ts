import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { type UserAttributes, UserModel } from '../../models/users'
import { VehicleModel } from '../../models/vehicles'
import { Pagination } from '../../utilities/pagination'
import { requestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'

export const getListUsers = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const whereClause = {
      deleted: { [Op.eq]: 0 },
      ...(Boolean(req.query.search) && {
        [Op.or]: [
          { userName: { [Op.like]: `%${req.query.search}%` } },
          { userEmail: { [Op.like]: `%${req.query.search}%` } }
        ]
      })
    }
    const users = await UserModel.findAndCountAll({
      where: whereClause,
      order: [['id', 'desc']],
      ...(req.query.pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      }),
      include: VehicleModel
    })
    const response = ResponseData.default
    response.data = page.data(users)
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const getSingleUser = async (req: any, res: Response): Promise<any> => {
  const requestQuery = req.query as UserAttributes
  const emptyField = requestChecker({
    requireList: ['userId'],
    requestData: requestQuery
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const user = await UserModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: requestQuery.userId }
      }
    })

    if (user == null) {
      const message = 'user not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = user
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
