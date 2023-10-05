/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface UserAttributes extends ZygoteAttributes {
  userId: string
  userName: string
  userRfidCard: number
  userPhoneNumber: number
  userEmail: string
  userPhoto: string
  userRegisterAs: string
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'createdOn' | 'modifiedOn'>

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export const UserModel = sequelize.define<UserInstance>(
  'users',
  {
    ...ZygoteModel,
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userRfidCard: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    userRegisterAs: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userPhoneNumber: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userPhoto: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'users',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
