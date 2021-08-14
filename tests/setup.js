const DbManager = require('../repositories/db.manager');
const config = require('../config');

beforeAll(async () => {
	await DbManager.setup(config);
});

afterAll(async () => {
	await DbManager.closeConnection();
});
