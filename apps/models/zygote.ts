import moment from 'moment'
import { DataTypes } from 'sequelize'

export interface ZygoteAttributes {
  id: number
  createdOn: Date | string
  modifiedOn: Date | null | string
  deleted: number
}

export const ZygoteModel = {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  createdOn: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  modifiedOn: {
    type: DataTypes.DATE,
    allowNull: true
  },
  deleted: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  }
}
