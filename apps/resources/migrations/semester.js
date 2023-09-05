"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("semester", {
			...ZygoteModel,
			semester_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			semester_created_by: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			semester_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			semester_status: {
				type: Sequelize.ENUM("active", "non-active"),
				allowNull: true,
				defaultValue: "active",
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("semester");
	},
};
