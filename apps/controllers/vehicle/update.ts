import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { type VehicleAttributes, VehicleModel } from '../../models/vehicles'
import { requestChecker } from '../../utilities/requestChecker'

export const updateVehicle = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as VehicleAttributes

  const emptyField = requestChecker({
    requireList: ['vehicleId'],
    requestData: requestBody
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
        vehicleId: {
          [Op.eq]: requestBody.vehicleId
        }
      }
    })

    if (vehicle == null) {
      const message = 'vehicle not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData = {
      ...(requestBody.vehicleName.length > 0 && { vehicleName: requestBody.vehicleName }),
      ...(requestBody.vehiclePlateNumber.length > 0 && {
        vehiclePlateNumber: requestBody.vehiclePlateNumber
      }),
      ...(requestBody.vehicleType.length > 0 && { vehicleType: requestBody.vehicleType }),
      ...(requestBody.vehicleUserId !== '' && {
        vehicleUserId: requestBody.vehicleUserId
      }),
      ...(requestBody.vehicleColor.length > 0 && {
        vehicleColor: requestBody.vehicleColor
      }),
      ...(requestBody.vehiclePhoto.length > 0 && {
        vehiclePhoto: requestBody.vehiclePhoto
      })
    }

    await VehicleModel.update(newData, {
      where: { id: { [Op.eq]: requestBody.id } }
    })

    const response = ResponseData.default
    response.data = 'vehicle has been updated.'
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
