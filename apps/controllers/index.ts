import { type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../utilities/response'

export const index = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = { aboutMe: 'welcome to gerbang itera API' }
    const response = ResponseData.default
    response.data = data
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
