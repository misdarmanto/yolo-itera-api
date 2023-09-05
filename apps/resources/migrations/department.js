"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("department", {
			...ZygoteModel,
			department_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			department_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			department_email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			department_is_registered: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("department");
	},
};
