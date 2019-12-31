import moment from 'moment';
import db from '../db';
import Helper from './Helper';

const Responses = {
    /**
     * Create A Responses
     * @param {object} req 
     * @param {object} res
     * @returns {object} responses object 
     */
    async save(req, res) {
        const saveQuery = `INSERT INTO
      responses(responseid, slug, fullresponse, responder, created_at, updated_at)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
        const values = [
            "response-" + Helper.generateId(),
            req.body.slug,
            req.body.responses,
            req.user.username,
            moment(new Date()),
            moment(new Date())
        ];

        try {
            const { rows } = await db.query(saveQuery, values);
            return res.status(200).send(rows[0]);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    },
    /**
     * Get One Response
     * @param {object} req 
     * @param {object} res 
     * @returns {object} responses array
     */
    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM responses WHERE slug = $1';
        try {
            const { rows, rowCount } = await db.query(findAllQuery, [req.body.slug]);
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Get A Responses
     * @param {object} req 
     * @param {object} res
     * @returns {object} responses object
     */
    async getOne(req, res) {
        const text = 'SELECT * FROM responses where responder = $1 and slug =$2';
        try {
            const { rows } = await db.query(text, [req.user.username, req.body.slug]);
            if (!rows[0]) {
                return res.status(200).send(rows[0]);
            }
            return res.status(200).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    /**
     * Update A Responses
     * @param {object} req 
     * @param {object} res 
     * @returns {object} updated responses
     */
    async update(req, res) {
        const findOneQuery = 'SELECT * FROM responses where responder = $1 and slug =$2';
        const updateOneQuery = `UPDATE responses
      SET fullresponse=$1, updated_at=$2 WHERE slug=$3 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.body.slug]);
            if (!rows[0]) {
                return res.status(200).send({ 'message': 'responses not found' });
            }
            const values = [
                req.body.responses || rows[0].fullresponse,
                moment(new Date()),
                req.body.slug
            ];
            const response = await db.query(updateOneQuery, values);
            return res.status(200).send(response.rows[0]);
        } catch (err) {
            return res.status(400).send(err);
        }
    },
    /**
     * Delete A Responses
     * @param {object} req 
     * @param {object} res 
     * @returns {void} return status code 204 
     */
    async delete(req, res) {
        const deleteQuery = 'DELETE FROM responses WHERE responder = $1 and slug =$2 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.body.responder, req.user.username]);
            if (!rows[0]) {
                return res.status(200).send({ 'message': 'responses not found' });
            }
            return res.status(200).send({ 'message': 'deleted' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

export default Responses;