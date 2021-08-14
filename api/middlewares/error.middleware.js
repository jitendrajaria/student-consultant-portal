const { ValidationError } = require('joi');
const errorMessages = {
	500: 'Internal Server Error',
	400: 'Invalid Request',
};

const sendError = (error, res) => {
	const status = error.status || 500;
	const message = errorMessages[error.status] || errorMessages[500];

	res.status(status).json({
		status: 'fail',
		message,
	});
};

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
	console.error(`Error occured here ${err.stack}`);
	const error = err;
	if (error instanceof ValidationError) {
		error.status = 400;
	}
	sendError(error, res);
};
