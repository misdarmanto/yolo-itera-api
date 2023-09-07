import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { UserModel } from "./users";
import { VehicleModel } from "./vehicles";
import { ZygoteAttributes, ZygoteModel } from "./zygote";
import moment from "moment";

export interface TrafficAttributes extends ZygoteAttributes {
	trafficId: string;
	trafficUserName: string | null;
	trafficUserRfidCard: string | null;
	trafficVehicleName: string | null;
	trafficVehicleType: "mobil" | "motor";
	trafficVehicleColor: string | null;
	trafficVehicleRfid: string | null;
	trafficVehicleCheckIn: string;
	trafficVehicleCheckOut: string | null;
	trafficVehicleImage: string | null;
	trafficVehiclePlateNumber: string | null;
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
		trafficId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		trafficUserName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		trafficUserRfidCard: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		trafficVehicleName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		trafficVehicleType: {
			type: DataTypes.ENUM("motor", "mobil"),
			allowNull: true,
		},
		trafficVehicleColor: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		trafficVehicleRfid: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		trafficVehicleCheckIn: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		trafficVehicleCheckOut: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		trafficVehicleImage: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		trafficVehiclePlateNumber: {
			type: DataTypes.STRING,
			allowNull: true,
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
		hooks: {
			beforeCreate: (record, options) => {
				let now = moment().add(7, "hours").format("YYYY-MM-DD HH:mm:ss");
				record.createdOn = now;
				record.modifiedOn = null;
			},
			beforeUpdate: (record, options) => {
				let now = moment().add(7, "hours").format("YYYY-MM-DD HH:mm:ss");
				record.modifiedOn = now;
			},
		},
	}
);
