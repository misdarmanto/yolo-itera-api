"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("mbkm_program", {
			...ZygoteModel,
			mbkm_program_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mbkm_program_created_by: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mbkm_program_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mbkm_program_category: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			mbkm_program_syllabus: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			mbkm_program_semester_id: {
				type: Sequelize.STRING,
				allowNull: true,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("mbkm_program");
	},
};
