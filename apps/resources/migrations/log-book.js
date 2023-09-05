"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("log_book", {
			...ZygoteModel,
			log_book_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			log_book_report_file: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			log_book_report_week: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			log_book_student_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			log_book_student_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			log_book_student_nim: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			log_book_study_program_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			log_book_study_program_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			log_book_department_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			log_book_department_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			log_book_semester_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("log_book");
	},
};
