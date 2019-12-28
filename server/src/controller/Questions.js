import moment from 'moment';
import db from '../db';
import Helper from './Helper';

const Questions = {
    /**
     * Create A Questions
     * @param {object} req 
     * @param {object} res
     * @returns {object} questions object 
     */
    async save(req, res) {
        const saveQuery = `INSERT INTO
      questions(questionid, slug, fullquestion, created_by, created_at, updated_at)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
        const values = [
            "question-" + Helper.generateId(),
            req.body.slug,
            req.body.questions,
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
     * Get All Reflections
     * @param {object} req 
     * @param {object} res 
     * @returns {object} questions array
     */
    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM questions where owner_id = $1';
        try {
            const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Get A Questions
     * @param {object} req 
     * @param {object} res
     * @returns {object} questions object
     */
    async getOne(req, res) {
        const text = 'SELECT * FROM questions WHERE slug = $1';
        try {
            const { rows } = await db.query(text, [req.body.slug]);
            if (!rows[0]) {
                return res.status(200).send(rows[0]);
            }
            return res.status(200).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    /**
     * Update A Questions
     * @param {object} req 
     * @param {object} res 
     * @returns {object} updated questions
     */
    async update(req, res) {
        const findOneQuery = 'SELECT * FROM questions WHERE slug=$1';
        const updateOneQuery = `UPDATE questions
      SET fullquestion=$1, updated_by=$2, updated_at=$3 WHERE slug=$4 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.body.slug]);
            if (!rows[0]) {
                return res.status(404).send({ 'message': 'questions not found' });
            }
            const values = [
                req.body.questions || rows[0].fullquestion,
                req.user.username,
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
     * Delete A Questions
     * @param {object} req 
     * @param {object} res 
     * @returns {void} return statuc code 204 
     */
    async delete(req, res) {
        const deleteQuery = 'DELETE FROM questions WHERE id=$1 AND owner_id = $2 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.body.id, req.user.id]);
            if (!rows[0]) {
                return res.status(404).send({ 'message': 'questions not found' });
            }
            return res.status(200).send({ 'message': 'deleted' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

export default Questions;