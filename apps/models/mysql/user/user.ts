import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { ZygoteAttributes, ZygoteModel } from "../zygote";

export interface UserAttributes extends ZygoteAttributes {
  userName: string;
  password: string;
  rfid: string;
  email: string;
  role: string;
  photo: string;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "createdOn" | "modifiedOn">;

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export const UserModel = sequelize.define<UserInstance>(
  "user",
  {
    ...ZygoteModel,
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rfid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: "user",
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: "InnoDB",
  },
);
