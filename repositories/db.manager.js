const mongoose = require('mongoose');
const faker = require('faker');
const { saveUniversity, findMinimumUniversityInDb, saveCourse } = require('./university.repository');

module.exports = (function dbManager() {
	async function setup(config) {
		try {
			await mongoose.connect(config.mongoUri, {
				reconnectTries: 5,
				reconnectInterval: 1000,
				useNewUrlParser: true,
			});
			await insertInitalData();
		} catch (err) {
			console.log('Error occured while setuping mongo', err);
		}
	}

	async function insertInitalData() {
		if ((await findMinimumUniversityInDb()) < 3) {
			for (let i = 0; i < 3; i++) {
				const universityData = {
					name: faker.company.companyName(),
					description: faker.lorem.paragraph(5),
					country: faker.address.country(),
					minGpa: Math.floor(Math.random() * 11),
					minGreScore: Math.floor(Math.random() * 361),
				};
				const uniData = await saveUniversity(universityData);
				const courseData = [
					{
						teacherName: faker.name.firstName(),
						name: 'Data Science',
						universityId: uniData._id,
					},
					{
						teacherName: faker.name.firstName(),
						name: 'Computer  Science',
						universityId: uniData._id,
					},
					{
						teacherName: faker.name.firstName(),
						name: 'Machine learning ',
						universityId: uniData._id,
					},
				];
				await saveCourse(courseData);
			}
		}
	}

	return { setup };
})();
