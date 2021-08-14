const faker = require('faker');
exports.universityData = {
	_id: '61179f4427a7fbe5348370ec',
	name: faker.company.companyName(),
	description: faker.lorem.paragraph(5),
	country: 'myRandomCountry',
	minGpa: Math.floor(Math.random() * 11),
	minGreScore: Math.floor(Math.random() * 361),
};
exports.courseData = [
	{
		teacherName: faker.name.firstName(),
		name: 'Data Science',
		university: this.universityData._id,
	},
	{
		teacherName: faker.name.firstName(),
		name: 'Computer Science',
		university: this.universityData._id,
	},
	{
		teacherName: faker.name.firstName(),
		name: 'Machine learning ',
		university: this.universityData._id,
	},
];
