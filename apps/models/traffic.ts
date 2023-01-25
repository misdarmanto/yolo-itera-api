import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { UserModel } from "./users";
import { VehicleModel } from "./vehicles";
import { ZygoteAttributes, ZygoteModel } from "./zygote";

export interface TrafficAttributes extends ZygoteAttributes {
	vehicleId: number;
	userId: number;
	checkIn: string;
	checkOut: string;
	photo: string;
}

type TrafficCreationAttributes = Optional<TrafficAttributes, "id" | "createdOn" | "modifiedOn">;

interface TrafficInstance extends Model<TrafficAttributes, TrafficCreationAttributes>, TrafficAttributes {}

export const TrafficModel = sequelize.define<TrafficInstance>(
	"traffic",
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
		tableName: "traffic",
		deletedAt: false,
		paranoid: true,
		underscored: true,
		freezeTableName: true,
		engine: "InnoDB",
	}
);

TrafficModel.hasOne(VehicleModel, { sourceKey: "vehicleId", foreignKey: "id" });
TrafficModel.hasOne(UserModel, { sourceKey: "userId", foreignKey: "id" });
