import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { type VehicleAttributes, VehicleModel } from '../../models/vehicles'
import { UserModel } from '../../models/users'
import { requestChecker } from '../../utilities/requestChecker'
import { v4 as uuidv4 } from 'uuid'

export const createVehicle = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as VehicleAttributes

  const emptyField = requestChecker({
    requireList: [
      'vehicleName',
      'vehiclePlateNumber',
      'vehicleType',
      'vehicleColor',
      'vehicleRfid',
      'vehicleUserId'
    ],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const isUsersExis = await UserModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: requestBody.vehicleUserId }
      }
    })

    if (isUsersExis == null) {
      const message = 'User belum terdafar, silahkan lakukan registrasi'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.FORBIDDEN).json(response)
    }

    requestBody.vehicleId = uuidv4()

    await VehicleModel.create(requestBody)
    const response = ResponseData.default
    response.data = 'vehicle has been created.'
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
