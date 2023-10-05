/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface AdminAttributes extends ZygoteAttributes {
  adminId: string
  adminName: string
  adminPassword: string
  adminEmail: string
  adminRole: string
  adminPhoto: string
}

type AdminCreationAttributes = Optional<
  AdminAttributes,
  'id' | 'createdOn' | 'modifiedOn'
>

interface AdminInstance
  extends Model<AdminAttributes, AdminCreationAttributes>,
    AdminAttributes {}

export const AdminModel = sequelize.define<AdminInstance>(
  'admin',
  {
    ...ZygoteModel,
    adminId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adminName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adminEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adminPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adminRole: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adminPhoto: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'admin',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
