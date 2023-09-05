"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("mbkm_program_prodi", {
			...ZygoteModel,
			mbkm_program_prodi_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mbkm_program_prodi_program_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mbkm_program_prodi_study_program_id: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			mbkm_program_prodi_study_program_name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			mbkm_program_prodi_department_id: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			mbkm_program_prodi_department_name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			mbkm_program_prodi_semester_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("mbkm_program_prodi");
	},
};
