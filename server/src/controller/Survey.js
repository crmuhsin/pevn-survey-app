import moment from 'moment';
import db from '../db';
import Helper from './Helper';

const Survey = {
    /**
     * Create A Survey
     * @param {object} req 
     * @param {object} res
     * @returns {object} survey object 
     */
    async save(req, res) {
        const saveQuery = `INSERT INTO
      surveys(surveyid, surveyname, slug, userid, created_at, updated_at)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
        const values = [
            "survey-" + Helper.generateId(),
            req.body.surveyname,
            req.body.surveyslug,
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
     * Get All Surveys
     * @param {object} req 
     * @param {object} res 
     * @returns {object} survey array
     */
    async getAll(req, res) {
        const findAllQuery = `SELECT * FROM surveys where userid = $1`;
        try {
            const { rows, rowCount } = await db.query(findAllQuery, [req.user.username]);
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Check Unique Slug
     * @param {object} req 
     * @param {object} res
     * @returns {object} survey object
     */
    async checkUniqueSlug(req, res) {
        const text = `SELECT * FROM surveys WHERE slug = $1`;
        try {
            const { rows, rowCount } = await db.query(text, [req.body.surveyslug]);
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    /**
     * Get A Survey
     * @param {object} req 
     * @param {object} res
     * @returns {object} survey object
     */
    async getOne(req, res) {
        const text = `SELECT * FROM surveys WHERE slug = $1 AND userid = $2`;
        try {
            const { rows } = await db.query(text, [req.body.slug, req.user.username]);
            if (!rows[0]) {
                return res.status(404).send({ 'message': 'survey not found' });
            }
            return res.status(200).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    /**
     * Update A Survey
     * @param {object} req 
     * @param {object} res 
     * @returns {object} updated survey
     */
    async update(req, res) {
        const findOneQuery = `SELECT * FROM surveys WHERE surveyid=$1 AND userid = $2`;
        const updateOneQuery = `UPDATE survey 
            SET surveyname = $1, updated_at = $2
            WHERE surveyid = $3 AND userid = $4 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.body.surveyid, req.user.username]);
            if (!rows[0]) {
                return res.status(404).send({ 'message': 'survey not found' });
            }
            const values = [
                req.body.surveyname || rows[0].surveyname,
                moment(new Date()),
                req.body.surveyid,
                req.user.username
            ];
            const response = await db.query(updateOneQuery, values);
            return res.status(200).send(response.rows[0]);
        } catch (err) {
            return res.status(400).send(err);
        }
    },
    /**
     * Delete A Survey
     * @param {object} req 
     * @param {object} res 
     * @returns {void} return statuc code 204 
     */
    async delete(req, res) {
        const deleteQuery = 'DELETE FROM surveys WHERE surveyid = $1 AND userid = $2  returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.body.surveyid, req.user.username]);
            if (!rows[0]) {
                return res.status(404).send({ 'message': 'survey not found' });
            }
            return res.status(200).send({ 'message': 'deleted' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

export default Survey;