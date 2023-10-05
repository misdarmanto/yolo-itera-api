import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { type VehicleAttributes, VehicleModel } from '../../models/vehicles'
import { Pagination } from '../../utilities/pagination'
import { UserModel } from '../../models/users'
import { requestChecker } from '../../utilities/requestChecker'

export const getListVehicle = async (req: any, res: Response): Promise<any> => {
  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const users = await VehicleModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        ...(Boolean(req.query.search) && {
          [Op.or]: [{ vehicleName: { [Op.like]: `%${req.query.search}%` } }]
        })
      },
      include: {
        model: UserModel,
        attributes: ['userName']
      },
      order: [['id', 'desc']],
      ...(req.query.pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      })
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

export const getSingleVehicle = async (req: any, res: Response): Promise<any> => {
  const requestQuery = req.query as VehicleAttributes

  const emptyField = requestChecker({
    requireList: ['vehicleId'],
    requestData: requestQuery
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const vehicle = await VehicleModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        vehicleId: { [Op.eq]: requestQuery.vehicleId }
      }
    })

    if (vehicle == null) {
      const message = 'vehicle not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = vehicle
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
