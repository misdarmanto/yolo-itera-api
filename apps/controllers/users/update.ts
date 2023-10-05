import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { type UserAttributes, UserModel } from '../../models/users'
import { requestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'

export const updateUser = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as UserAttributes

  const emptyField = requestChecker({
    requireList: ['userId'],
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
        userId: { [Op.eq]: requestBody.userId }
      }
    })

    if (user == null) {
      const message = 'user not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const newData: UserAttributes | any = {
      ...(requestBody.userName.length > 0 && { userName: requestBody.userName }),
      ...(requestBody.userEmail.length > 0 && { userEmail: requestBody.userEmail }),
      ...(requestBody.userRegisterAs.length > 0 && {
        userRegisterAs: requestBody.userRegisterAs
      }),
      ...(requestBody.userPhoneNumber !== 0 && { type: requestBody.userPhoneNumber }),
      ...(requestBody.userPhoto.length > 0 && { userPhoto: requestBody.userPhoto })
    }

    await UserModel.update(newData, {
      where: { userId: { [Op.eq]: requestBody.userId } }
    })

    const response = ResponseData.default
    response.data = 'user has been updated.'
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
