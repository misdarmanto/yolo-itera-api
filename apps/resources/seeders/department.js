"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("department", [
			{
				department_id: "ed697f88-a372-442d-bc39-3772f544bdb5",
				department_name: "SAINS",
				department_email: "sains@itera.ac.id",
				department_is_registered: false,
			},
			{
				department_id: "4181f385-6386-4f48-9a07-bf039af11175",
				department_name: "JTIK",
				department_email: "jtik@itera.ac.id",
				department_is_registered: false,
			},
			{
				department_id: "9e9a3381-7459-476b-a72e-8ab053da9e99",
				department_name: "JTPI",
				department_email: "jtpi@itera.ac.id",
				department_is_registered: false,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("department", null, {});
	},
};
