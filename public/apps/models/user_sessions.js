"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSessionModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
const zygote_1 = require("./zygote");
const users_1 = require("./users");
exports.UserSessionModel = _1.sequelize.define("user_sessions", {
    ...zygote_1.ZygoteModel,
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id",
        },
    },
    session: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    expiredOn: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
}, {
    ..._1.sequelize,
    timestamps: false,
    tableName: "user_sessions",
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: "InnoDB",
});
users_1.UserModel.hasOne(exports.UserSessionModel, { sourceKey: "id", foreignKey: "userId" });
