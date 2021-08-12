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
	let params = req.query;
	let response = await findUniversityByQuery(2, 40, 'Saint Lucia', 'Science');
	console.log(response);
	res.json({ res: response });
};
