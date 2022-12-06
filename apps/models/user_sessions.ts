import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { ZygoteAttributes, ZygoteModel } from "./zygote";
import { UserModel } from "./users";

export interface UserSessionAttributes extends ZygoteAttributes {
  userId: number;
  session: string | null;
  expiredOn: number | null;
}

type UserSessionCreationAttributes = Optional<UserSessionAttributes, "id" | "createdOn" | "modifiedOn">;

interface UserSessionInstance extends Model<UserSessionAttributes, UserSessionCreationAttributes>, UserSessionAttributes {}

export const UserSessionModel = sequelize.define<UserSessionInstance>(
  "user_sessions",
  {
    ...ZygoteModel,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    session: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    expiredOn: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: "user_sessions",
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: "InnoDB",
  },
);

UserModel.hasOne(UserSessionModel, { sourceKey: "id", foreignKey: "userId" });
