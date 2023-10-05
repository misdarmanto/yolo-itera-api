import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { type AdminAttributes, AdminModel } from '../../models/admin'
import { requestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'

export const updateAdmin = async (req: any, res: Response): Promise<any> => {
  const requestBodybody = req.body as AdminAttributes

  const emptyField = requestChecker({
    requireList: ['adminId'],
    requestData: requestBodybody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const adminCheck = await AdminModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        adminId: { [Op.eq]: requestBodybody.adminId }
      }
    })

    if (adminCheck === null) {
      const message = 'Admin not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: AdminAttributes | any = {
      ...(Boolean(requestBodybody.adminName) && { name: requestBodybody.adminName }),
      ...(requestBodybody.adminEmail.length > 0 && { email: requestBodybody.adminEmail }),
      ...(requestBodybody.adminRole.length > 0 && {
        registerAs: requestBodybody.adminRole
      }),
      ...(requestBodybody.adminPassword.length > 0 && {
        type: requestBodybody.adminPassword
      })
    }

    await AdminModel.update(newData, {
      where: { adminId: { [Op.eq]: requestBodybody.adminId } }
    })
    const response = ResponseData.default
    response.data = 'admin has been updated.'
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
