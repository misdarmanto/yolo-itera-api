import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { UserModel } from "./users";
import { ZygoteAttributes, ZygoteModel } from "./zygote";

export interface VehicleAttributes extends ZygoteAttributes {
	vehicleId: string;
	vehiclePlateNumber: string;
	vehicleType: "motor" | "mobil";
	vehicleRfid: string;
	vehicleUserId: string;
	vehicleName: string;
	vehicleColor: string;
	vehiclePhoto: string;
}

type VehicleCreationAttributes = Optional<
	VehicleAttributes,
	"id" | "createdOn" | "modifiedOn"
>;

interface VehicleInstance
	extends Model<VehicleAttributes, VehicleCreationAttributes>,
		VehicleAttributes {}

export const VehicleModel = sequelize.define<VehicleInstance>(
	"vehicles",
	{
		...ZygoteModel,
		vehicleId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		vehiclePlateNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		vehicleType: {
			type: DataTypes.ENUM("motor", "mobil"),
			allowNull: false,
		},
		vehicleRfid: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		vehicleUserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		vehicleName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		vehicleColor: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		vehiclePhoto: {
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

VehicleModel.hasOne(UserModel, { sourceKey: "vehicleUserId", foreignKey: "userId" });
UserModel.hasMany(VehicleModel, { sourceKey: "userId", foreignKey: "vehicleUserId" });
