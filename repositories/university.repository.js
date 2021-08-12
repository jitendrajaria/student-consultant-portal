const CourseModel = require('./models/course.model');
const UniversityModel = require('./models/university.model');

module.exports = (() => {
	function findUniversityByQuery(gpa, greScore, country, courseName) {
		let query = { minGpa: { $gte: 2 } };
		return CourseModel.fuzzySearch('learn')
			.populate({ path: 'universityId', match: query, select: 'name' })
			.find({ universityId: { $ne: null } });
	}

	function saveUniversity(universityDetails) {
		return UniversityModel.create(universityDetails);
	}

	function findMinimumUniversityInDb() {
		return UniversityModel.count({});
	}

	function saveCourse(courseDetails) {
		return CourseModel.create(courseDetails);
	}
	return {
		findUniversityByQuery,
		saveUniversity,
		findMinimumUniversityInDb,
		saveCourse,
	};
})();
