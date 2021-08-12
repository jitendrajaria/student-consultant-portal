const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	port: process.env.PORT || 8003,
	env: process.env.NODE_ENV || 'development',
	baseRoute: '/api/v1',
	mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/sc_portal',
};
