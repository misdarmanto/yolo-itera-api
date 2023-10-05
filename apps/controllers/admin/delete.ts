import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { type AdminAttributes, AdminModel } from '../../models/admin'
import { requestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'

export const deleteAdmin = async (req: any, res: Response): Promise<any> => {
  const query = req.query as AdminAttributes

  const emptyField = requestChecker({
    requireList: ['id'],
    requestData: req.query
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const adminCheck = await AdminModel.findOne({
      where: { deleted: { [Op.eq]: 0 }, id: { [Op.eq]: query.id } }
    })

    if (adminCheck == null) {
      const message = 'Admin not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    await AdminModel.update({ deleted: 1 }, { where: { id: { [Op.eq]: query.id } } })
    const response = ResponseData.default
    response.data = 'admin has been deleted'
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
