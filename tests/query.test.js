const faker = require('faker');
const { saveUniversity, saveCourse, removeFixtureData } = require('../repositories/university.repository');
const { universityData, courseData } = require('./fixture/index.fixture');
const ServerMock = require('./mocks/server');

const serverMock = new ServerMock();
const api = serverMock.setup();

describe('Testing query API', () => {
	beforeAll(async () => {
		await saveUniversity(universityData);
		await saveCourse(courseData);
	});

	afterAll(async () => {
		await removeFixtureData(universityData._id);
	});

	const apiUrl = '/api/v1/university';
	it('should return true', () => {
		expect(1 + 1).toBe(2);
	});
	it('should return 400 from the API, input is missing', async () => {
		const res = await api.get(apiUrl);
		expect(res.statusCode).toBe(400);
	});
	it('should return 400 from the API, input greScore is missing', async () => {
		const res = await api.get(`${apiUrl}?gpa=1`);
		expect(res.statusCode).toBe(400);
	});
	it('should return 400 from the API, input country is missing', async () => {
		const res = await api.get(`${apiUrl}?gpa=1&greScore=10`);
		expect(res.statusCode).toBe(400);
	});
	it('should return 400 from the API, input gpa is not valid', async () => {
		const res = await api.get(`${apiUrl}?gpa=-1&greScore=10&country=myRandomCountry`);
		expect(res.statusCode).toBe(400);
	});
	it('should return 400 from the API, input greScore is not valid', async () => {
		const res = await api.get(`${apiUrl}?gpa=-1&greScore==10&country=myRandomCountry`);
		expect(res.statusCode).toBe(400);
	});
	it('should return 200 from the API, input check without course', async () => {
		const res = await api.get(`${apiUrl}?gpa=0&greScore=10&country=myRandomCountry`);
		expect(res.statusCode).toBe(200);
		expect(res.body.data).not.toBeNull();
		expect(res.body.data.length).toBe(3);
	});
	it('should return 400 from the API, input course name length is invalid', async () => {
		const res = await api.get(`${apiUrl}?gpa=0&greScore=10&country=myRandomCountry&courseName=${faker.lorem.words(200)}`);
		expect(res.statusCode).toBe(400);
	});

	it('should return 200 from the API, input check with course', async () => {
		const res = await api.get(`${apiUrl}?gpa=0&greScore=10&country=myRandomCountry&courseName=learn`);
		expect(res.statusCode).toBe(200);
		expect(res.body.data).not.toBeNull();
		expect(res.body.data.length).toBe(1);
	});

	it('should return 200 from the API, input check with course with value science', async () => {
		const res = await api.get(`${apiUrl}?gpa=0&greScore=10&country=myRandomCountry&courseName=science`);
		expect(res.statusCode).toBe(200);
		expect(res.body.data).not.toBeNull();
		expect(res.body.data.length).toBe(2);
	});
});
