import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { verifyAccessToken } from '../../utilities/jwt'
import { requestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'

export const logout = async (req: any, res: Response): Promise<any> => {
  const emptyField = requestChecker({
    requireList: ['token'],
    requestData: req.body
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const user = verifyAccessToken(req.body.token)
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
