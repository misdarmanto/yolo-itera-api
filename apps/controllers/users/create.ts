import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { type UserAttributes, UserModel } from '../../models/users'
import { requestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import { v4 as uuidv4 } from 'uuid'

export const createUser = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as UserAttributes

  const emptyField = requestChecker({
    requireList: [
      'userName',
      'userEmail',
      'userRfidCard',
      'userPhoneNumber',
      'userRegisterAs',
      'userPhoto'
    ],
    requestData: requestBody
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
        userEmail: { [Op.eq]: requestBody.userEmail }
      }
    })

    if (user != null) {
      const message = 'User telah terdaftar silahkan buat yang baru.'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    requestBody.userId = uuidv4()
    await UserModel.create(requestBody)

    const response = ResponseData.default
    response.data = 'user has been created'
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
