"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("student", {
			...ZygoteModel,
			student_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			student_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			student_nim: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			student_email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			student_is_registered: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},
			student_department_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			student_department_name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			student_study_program_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			student_study_program_name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			student_mbkm_program_id: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			student_transkrip_id: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			student_semester_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("student");
	},
};
