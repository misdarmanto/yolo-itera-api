import dotenv from "dotenv";
dotenv.config();

export const DATABASES = {
	db_name: process.env.DB_NAME || "project_itera",
	db_host: process.env.DB_HOST || "127.0.0.1", //db4free.net
	db_port: process.env.DB_PORT || 3306,
	db_username: process.env.DB_USERNAME || "root", //misdar
	db_password: process.env.DB_PASSWORD || "toor", //12qwaszx
	db_log: process.env.DB_LOG == "true",
};
