import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { type AdminAttributes, AdminModel } from '../../models/admin'
import { requestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { hashPassword } from '../../utilities/scure_password'
import { v4 as uuidv4 } from 'uuid'

export const registration = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as AdminAttributes

  const emptyField = requestChecker({
    requireList: ['adminName', 'adminEmail', 'adminPassword', 'adminRole', 'adminPhoto'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const admin = await AdminModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        [Op.or]: [
          { adminName: { [Op.eq]: requestBody.adminName } },
          { adminEmail: { [Op.eq]: requestBody.adminEmail } }
        ]
      }
    })

    if (admin !== null) {
      const message = `Email ${admin.adminEmail} sudah terdaftar. Silahkan gunakan email lain.`
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    requestBody.adminId = uuidv4()
    requestBody.adminPassword = hashPassword(requestBody.adminPassword)
    await AdminModel.create(requestBody)

    const response = ResponseData.default
    response.data = 'registration sucsess'
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
