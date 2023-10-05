import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { type AdminAttributes, AdminModel } from '../../models/admin'
import { requestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { hashPassword } from '../../utilities/scure_password'

export const login = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as AdminAttributes

  const emptyField = requestChecker({
    requireList: ['adminEmail', 'adminPassword'],
    requestData: requestBody
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const admin = await AdminModel.findOne({
      raw: true,
      where: {
        deleted: { [Op.eq]: 0 },
        [Op.or]: [
          { adminName: { [Op.eq]: requestBody.adminName } },
          { adminEmail: { [Op.eq]: requestBody.adminEmail } }
        ]
      }
    })

    if (admin === null) {
      const message =
        'Akun tidak ditemukan. Silahkan lakukan pendaftaran terlebih dahulu!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    if (hashPassword(requestBody.adminPassword) !== admin?.adminPassword) {
      const message = 'kombinasi email dan password tidak ditemukan!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    const response = ResponseData.default
    response.data = {
      adminId: admin?.adminId,
      adminName: admin?.adminName,
      adminEmail: admin?.adminEmail,
      adminRole: admin?.adminRole,
      adminPhoto: admin?.adminRole
    }
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
