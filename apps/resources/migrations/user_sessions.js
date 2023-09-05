"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("user_sessions", {
			...ZygoteModel,
			user_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			session: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			expired_on: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("user_sessions");
	},
};
