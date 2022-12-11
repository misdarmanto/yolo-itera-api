"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
exports.UserModel = _1.sequelize.define("users", {
    ...zygote_1.ZygoteModel,
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    registerAs: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    rfid: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    photoIdentity: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: "users",
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: "InnoDB",
});
