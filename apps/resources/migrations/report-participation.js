"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("report_participation", {
			...ZygoteModel,
			report_participation_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			report_participation_letter: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			report_participation_status_message: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			report_participation_status: {
				type: Sequelize.ENUM("waiting", "accepted", "rejected"),
				allowNull: true,
				defaultValue: "waiting",
			},
			report_participation_student_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			report_participation_department_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			report_participation_study_program_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			report_participation_semester_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("report_participation");
	},
};
