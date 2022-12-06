import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { UserModel } from "./users";
import { ZygoteAttributes, ZygoteModel } from "./zygote";

export interface VehicleAttributes extends ZygoteAttributes {
    plateNumber: number;
    type: string;
    userId: number;
    name: string;
    color: string;
    photo: string;
    stnk: string;
}

type VehicleCreationAttributes = Optional<VehicleAttributes, "id" | "createdOn" | "modifiedOn">;

interface VehicleInstance extends Model<VehicleAttributes, VehicleCreationAttributes>, VehicleAttributes {}

export const VehicleModel = sequelize.define<VehicleInstance>(
    "vehicles",
    {
        ...ZygoteModel,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        plateNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stnk: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        ...sequelize,
        timestamps: false,
        tableName: "vehicles",
        deletedAt: false,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        engine: "InnoDB",
    }
);

UserModel.hasMany(VehicleModel, { sourceKey: "id", foreignKey: "user_id" });
VehicleModel.hasOne(UserModel, { sourceKey: "user_id", foreignKey: "id" });
