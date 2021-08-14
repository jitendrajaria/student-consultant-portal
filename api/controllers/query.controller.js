const { Request, Response, NextFunction } = require('express');
const { findUniversityByQuery } = require('../../repositories/university.repository');
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
module.exports = async function queryHandler(req, res, next) {
	try {
		let inputData = res.locals.inputData;
		res.locals.response = await findUniversityByQuery({ ...inputData });
		next();
	} catch (err) {
		console.error(err);
		next(err);
	}
};
