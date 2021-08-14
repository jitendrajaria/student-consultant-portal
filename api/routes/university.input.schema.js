const { Request, Response, NextFunction } = require('express');
const Joi = require('joi');

const adminSchema = Joi.object({
	gpa: Joi.number().min(0).max(10).required(),
	greScore: Joi.number().min(0).max(360).required(),
	country: Joi.string().max(100).required().allow(''),
	courseName: Joi.string().max(100).allow('', null),
});

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const inputQueryValidate = (req, res, next) => {
	const body = req.query;

	const validateRes = adminSchema.validate(body);
	if (validateRes.error) {
		return next(validateRes.error);
	}
	res.locals.inputData = body;
	return next();
};

module.exports = { inputQueryValidate };
