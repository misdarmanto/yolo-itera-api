"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficsModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
const users_1 = require("./users");
const vehicles_1 = require("./vehicles");
const zygote_1 = require("./zygote");
exports.TrafficsModel = _1.sequelize.define("traffics", {
    ...zygote_1.ZygoteModel,
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    vehicleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    checkIn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    checkOut: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: "traffics",
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: "InnoDB",
});
exports.TrafficsModel.hasOne(vehicles_1.VehicleModel, { sourceKey: "vehicleId", foreignKey: "id" });
exports.TrafficsModel.hasOne(users_1.UserModel, { sourceKey: "userId", foreignKey: "id" });
