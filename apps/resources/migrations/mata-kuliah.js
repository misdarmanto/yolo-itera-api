"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("mata_kuliah", {
			...ZygoteModel,
			mata_kuliah_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mata_kuliah_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mata_kuliah_study_program_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mata_kuliah_study_program_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mata_kuliah_department_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mata_kuliah_department_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mata_kuliah_sks_total: {
				type: Sequelize.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			mata_kuliah_semester_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("mata_kuliah");
	},
};
