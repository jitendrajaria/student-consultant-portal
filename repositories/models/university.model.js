const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	country: { type: String, required: true },
	minGpa: { type: Number, required: true },
	minGreScore: { type: Number, required: true },

	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('University', UniversitySchema);
