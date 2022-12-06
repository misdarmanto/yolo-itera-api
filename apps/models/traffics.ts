import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { UserModel } from "./users";
import { VehicleModel } from "./vehicles";
import { ZygoteAttributes, ZygoteModel } from "./zygote";

export interface TrafficsAttributes extends ZygoteAttributes {
    vehicleId: number;
    userId: number;
    checkIn: string;
    checkOut: string;
    photo: string;
}

type TrafficsCreationAttributes = Optional<TrafficsAttributes, "id" | "createdOn" | "modifiedOn">;

interface TrafficsInstance extends Model<TrafficsAttributes, TrafficsCreationAttributes>, TrafficsAttributes {}

export const TrafficsModel = sequelize.define<TrafficsInstance>(
    "traffics",
    {
        ...ZygoteModel,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        checkIn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        checkOut: {
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
        tableName: "traffics",
        deletedAt: false,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        engine: "InnoDB",
    }
);

TrafficsModel.hasOne(VehicleModel, { sourceKey: "vehicleId", foreignKey: "id" });
TrafficsModel.hasOne(UserModel, { sourceKey: "userId", foreignKey: "id" });
