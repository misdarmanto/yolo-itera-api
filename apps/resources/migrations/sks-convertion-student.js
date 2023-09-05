"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("sks_convertion_student", {
			...ZygoteModel,
			sks_convertion_student_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			sks_convertion_student_student_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			sks_convertion_student_sks_convertion_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			sks_convertion_student_sks_convertion_schema_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			sks_convertion_student_matkul_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			sks_convertion_student_study_program_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			sks_convertion_student_mbkm_program_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("sks_convertion_student");
	},
};
