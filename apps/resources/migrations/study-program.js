"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("study_program", {
			...ZygoteModel,
			study_program_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			study_program_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			study_program_email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			study_program_is_registered: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},
			study_program_department_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			study_program_department_name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			study_program_semester_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("study_program");
	},
};
