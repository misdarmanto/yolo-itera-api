import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { type UserAttributes, UserModel } from '../../models/users'
import { requestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'

export const deleteUser = async (req: any, res: Response): Promise<any> => {
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
      raw: true,
      where: {
        deleted: { [Op.eq]: 0 },
        userEmail: { [Op.eq]: requestQuery.userEmail }
      }
    })

    if (user == null) {
      const message = 'User not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    await UserModel.update(
      { deleted: 1 },
      { where: { userId: { [Op.eq]: requestQuery.userId } } }
    )
    const response = ResponseData.default
    response.data = 'user has been deleted'
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
