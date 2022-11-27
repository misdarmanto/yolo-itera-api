import { Sequelize } from "sequelize"
import { DATABASES } from "../../../config/databases"
export const sequelize = new Sequelize(`mysql://${DATABASES.media.db_username}:${DATABASES.media.db_password}@${DATABASES.media.db_host}:${DATABASES.media.db_port}/${DATABASES.media.db_name}`, {
    logging: DATABASES.media.db_log
})