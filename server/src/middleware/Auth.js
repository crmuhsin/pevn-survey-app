import jwt from 'jsonwebtoken';
import db from '../db';

const Auth = {
    /**
     * Verify Token
     * @param {object} req 
     * @param {object} res 
     * @param {object} next
     * @returns {object|void} response object 
     */
    async verifyToken(req, res, next) {
        let token = req.headers['x-access-token'] || req.headers['authorization']; 

        // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        if (!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }

        try {
            const decoded = await jwt.verify(token, process.env.SECRET);
            const text = 'SELECT * FROM users WHERE username = $1';
            const { rows } = await db.query(text, [decoded.userId]);
            if (!rows[0]) {
                return res.status(400).send({ 'message': 'The token you provided is invalid' });
            }
            req.user = { username: decoded.userId };
            next();
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

export default Auth;