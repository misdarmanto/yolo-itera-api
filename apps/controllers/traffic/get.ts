import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { type TrafficAttributes, TrafficModel } from '../../models/traffic'
import { Pagination } from '../../utilities/pagination'
import { requestChecker } from '../../utilities/requestChecker'
import { ResponseData } from '../../utilities/response'
import moment from 'moment'

export const getListTraffic = async (req: any, res: Response): Promise<any> => {
  const TODAY_START = moment().startOf('day').toDate()
  const TODAY_END = moment().endOf('day').toDate()

  const WEEK_START = moment().startOf('week').toDate()
  const WEEK_END = moment().endOf('week').toDate()

  const MONTH_START = moment().startOf('month').toDate()
  const MONTH_END = moment().endOf('month').toDate()

  const YEAR_START = moment().startOf('year').toDate()
  const YEAR_END = moment().endOf('year').toDate()

  const YESTERDAY = moment().clone().subtract(1, 'day')
  const YESTERDAY_START = YESTERDAY.startOf('day').toDate()
  const YESTERDAY_END = YESTERDAY.endOf('day').toDate()

  try {
    const page = new Pagination(
      parseInt(req.query.page) ?? 0,
      parseInt(req.query.size) ?? 10
    )
    const traffic = await TrafficModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        ...(req.query.range === 'today' && {
          created_on: { [Op.between]: [TODAY_START, TODAY_END] }
        }),
        ...(req.query.range === 'yesterday' && {
          created_on: {
            [Op.between]: [YESTERDAY_START, YESTERDAY_END]
          }
        }),
        ...(req.query.range === 'week' && {
          created_on: { [Op.between]: [WEEK_START, WEEK_END] }
        }),
        ...(req.query.range === 'month' && {
          created_on: { [Op.between]: [MONTH_START, MONTH_END] }
        }),
        ...(req.query.range === 'year' && {
          created_on: { [Op.between]: [YEAR_START, YEAR_END] }
        }),
        ...(Boolean(req.query.search) && {
          [Op.or]: [
            {
              trafficUserName: {
                [Op.like]: `%${req.query.search}%`
              }
            },
            { trafficVehicleName: { [Op.like]: `%${req.query.search}%` } },
            {
              trafficVehiclePlateNumber: {
                [Op.like]: `%${req.query.search}%`
              }
            }
          ]
        })
      },
      order: [['id', 'desc']],
      ...(req.query.pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.default
    response.data = page.data(traffic)
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}

export const getSingleTraffic = async (req: any, res: Response): Promise<any> => {
  const requestParams = req.params as TrafficAttributes
  const emptyField = requestChecker({
    requireList: ['trafficId'],
    requestData: requestParams
  })

  if (emptyField.length > 0) {
    const message = `invalid request parameter! require (${emptyField})`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  try {
    const traffic = await TrafficModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        trafficId: { [Op.eq]: requestParams.trafficId }
      }
    })

    if (traffic !== null) {
      const message = 'traffic not found'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.default
    response.data = traffic
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
