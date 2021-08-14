const CourseModel = require('./models/course.model');
const UniversityModel = require('./models/university.model');

module.exports = (() => {
	async function findUniversityByQuery({ gpa, greScore, country, courseName }) {
		let query = {
			minGpa: { $gte: gpa },
			minGreScore: { $gte: greScore },
			country: { $regex: country, $options: 'i' },
		};

		const res = await CourseModel.fuzzySearch({ query: courseName }).populate({ path: 'university', match: query, select: 'name minGpa minGreScore country' });
		return res.filter((course) => course.university);
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

	async function removeFixtureData(id) {
		await UniversityModel.deleteOne({ _id: id });
		await CourseModel.deleteMany({ university: id });
	}

	return {
		findUniversityByQuery,
		saveUniversity,
		findMinimumUniversityInDb,
		saveCourse,
		removeFixtureData,
	};
})();
