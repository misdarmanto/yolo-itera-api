"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("student", [
			{
				student_id: "8cd17bb9-d727-4578-99c5ssadsa",
				student_name: "Yono T.Geomatika",
				student_nim: "1323232223",
				student_email: "Yono.mahasiswa@mail.com",
				student_is_registered: false,
				student_department_id: "4181f385-6386-4f48-9a07-bf039af11175",
				student_department_name: "JTIK",
				student_study_program_id: "b1491aae-9753-4bde-9934-2c8fb987d8c8",
				student_study_program_name: "Teknik Geomatika",
				student_mbkm_program_id: "0d373bab-7f46-4f57-8e1b-7397d91ff0ec",
				student_transkrip_id: null,
				student_semester_id: "a7b24cf5-25e1-43d0-9381-f39f5140a91b",
			},
			{
				student_id: "8cd17bb9-d727-4578-99c5-a223296d55b8",
				student_name: "Eka Matematika",
				student_nim: "124545444",
				student_email: "eka.mahasiswa@mail.com",
				student_is_registered: false,
				student_department_id: "ed697f88-a372-442d-bc39-3772f544bdb5",
				student_department_name: "SAINS",
				student_study_program_id: "30b3c037-7d11-4a60-a039-ab09b007fd94",
				student_study_program_name: "Matematika",
				student_mbkm_program_id: null,
				student_transkrip_id: null,
				student_semester_id: "a7b24cf5-25e1-43d0-9381-f39f5140a91b",
			},
			{
				student_id: "46cbc5cd-8f15-4777-a7c1-84767ec2342f",
				student_name: "Budi T.Telekomunikasi",
				student_nim: "1254343434",
				student_email: "budi.mahasiswa@mail.com",
				student_is_registered: false,
				student_department_id: "9e9a3381-7459-476b-a72e-8ab053da9e99",
				student_department_name: "JTIP",
				student_study_program_id: "8db52aa9-b4f4-4909-97d3-43638d48ce2a",
				student_study_program_name: "Teknik Telekomunikasi",
				student_mbkm_program_id: "973d80a8-c4b9-4d73-9719-18e7e088995c",
				student_transkrip_id: null,
				student_semester_id: "a7b24cf5-25e1-43d0-9381-f39f5140a91b",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("student", null, {});
	},
};
