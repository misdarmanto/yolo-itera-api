import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { ZygoteAttributes, ZygoteModel } from "./zygote";

export interface AdminAttributes extends ZygoteAttributes {
  name: string;
  password: string;
  email: string;
  role: string;
  photo: string;
}

type AdminCreationAttributes = Optional<AdminAttributes, "id" | "createdOn" | "modifiedOn">;

interface AdminInstance extends Model<AdminAttributes, AdminCreationAttributes>, AdminAttributes {}

export const AdminModel = sequelize.define<AdminInstance>(
  "admin",
  {
    ...ZygoteModel,
   name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
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
    tableName: "admin",
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: "InnoDB",
  },
);
