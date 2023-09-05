"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("transkrip", {
			...ZygoteModel,
			transkrip_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			transkrip_student_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			transkrip_mata_kuliah_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			transkrip_study_program_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			transkrip_department_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			transkrip_mata_kuliah_grade: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			transkrip_semester_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("transkrip");
	},
};
