const mongoose = require('mongoose');
const mongooseFuzzySearching = require('mongoose-fuzzy-searching');

const CourseSchema = new mongoose.Schema({
	name: { type: String, required: true },
	teacherName: { type: String, requred: true },
	university: { type: mongoose.Schema.ObjectId, ref: 'University' },
}).plugin(mongooseFuzzySearching, {
	fields: ['name'],
});
module.exports = mongoose.model('Course', CourseSchema);
