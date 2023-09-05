"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("recomendation_letter", {
			...ZygoteModel,
			recomendation_letter_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			recomendation_letter_student_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			recomendation_letter_department_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			recomendation_letter_study_program_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			recomendation_letter_student_transkrip: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			recomendation_letter_dosen_wali: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			recomendation_letter_syllabus: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			recomendation_letter_approval_letter: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			recomendation_letter_sptjm_letter: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			recomendation_letter_from_study_program: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			recomendation_letter_from_department: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			recomendation_letter_from_lp3m: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			recomendation_letter_from_academic: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			recomendation_letter_program_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			recomendation_letter_program_description: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			recomendation_letter_program_correlation: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			recomendation_letter_status: {
				type: Sequelize.ENUM("waiting", "accepted", "rejected"),
				allowNull: true,
				defaultValue: "waiting",
			},
			recomendation_letter_status_message: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			recomendation_letter_assign_to_student: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},
			recomendation_letter_assign_to_study_program: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},
			recomendation_letter_assign_to_department: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},
			recomendation_letter_assign_to_lp3m: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},
			recomendation_letter_assign_to_academic: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},
			recomendation_letter_semester_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("recomendation_letter");
	},
};
