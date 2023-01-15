import { Sequelize } from "sequelize"
import { DATABASES } from "../config/databases"
export const sequelize = new Sequelize(`mysql://${DATABASES.db_username}:${DATABASES.db_password}@${DATABASES.db_host}:${DATABASES.db_port}/${DATABASES.db_name}`, {
    logging: DATABASES.db_log
})