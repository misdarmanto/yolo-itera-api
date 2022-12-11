"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
const users_1 = require("./users");
const zygote_1 = require("./zygote");
exports.VehicleModel = _1.sequelize.define("vehicles", {
    ...zygote_1.ZygoteModel,
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    plateNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    stnk: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: "vehicles",
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: "InnoDB",
});
users_1.UserModel.hasMany(exports.VehicleModel, { sourceKey: "id", foreignKey: "user_id" });
exports.VehicleModel.hasOne(users_1.UserModel, { sourceKey: "user_id", foreignKey: "id" });
