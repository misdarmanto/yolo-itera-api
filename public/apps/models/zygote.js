"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZygoteModel = void 0;
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
exports.ZygoteModel = {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    createdOn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
    },
    modifiedOn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    deleted: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
};
