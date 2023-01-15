import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { ZygoteAttributes, ZygoteModel } from "./zygote";

export interface UserAttributes extends ZygoteAttributes {
    rfid: number;
    phone: number;
    email: string;
    name: string;
    photo: string;
    photoIdentity: string;
    registerAs: string;
}

type UserCreationAttributes = Optional<UserAttributes, "id" | "createdOn" | "modifiedOn">;

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export const UserModel = sequelize.define<UserInstance>(
    "users",
    {
        ...ZygoteModel,
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        registerAs: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rfid: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        phone: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photoIdentity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        ...sequelize,
        timestamps: false,
        tableName: "users",
        deletedAt: false,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        engine: "InnoDB",
    }
);
