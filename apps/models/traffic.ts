import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { UserModel } from "./users";
import { VehicleModel } from "./vehicles";
import { ZygoteAttributes, ZygoteModel } from "./zygote";

export interface TrafficAttributes extends ZygoteAttributes {
	trafficVehicleId: number;
	trafficUserId: number;
	trafficVehicleCheckIn: string;
	trafficVehicleCheckOut: string;
	trafficVehicleImage: string;
}

type TrafficCreationAttributes = Optional<
	TrafficAttributes,
	"id" | "createdOn" | "modifiedOn"
>;

interface TrafficInstance
	extends Model<TrafficAttributes, TrafficCreationAttributes>,
		TrafficAttributes {}

export const TrafficModel = sequelize.define<TrafficInstance>(
	"traffic",
	{
		...ZygoteModel,
		trafficUserId: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		trafficVehicleId: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		trafficVehicleCheckIn: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		trafficVehicleCheckOut: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		trafficVehicleImage: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		...sequelize,
		timestamps: false,
		tableName: "traffic",
		deletedAt: false,
		paranoid: true,
		underscored: true,
		freezeTableName: true,
		engine: "InnoDB",
	}
);

TrafficModel.hasOne(VehicleModel, { sourceKey: "trafficVehicleId", foreignKey: "id" });
TrafficModel.hasOne(UserModel, { sourceKey: "trafficUserId", foreignKey: "id" });
