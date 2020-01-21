import express from 'express';
import Auth from '../middleware/Auth';
import User from '../controller/User';
var router = express.Router()

router.post('/register', User.register);
router.post('/login', User.login);
router.post('/check-user', User.checkUser);
router.post('/delete', Auth.verifyToken, User.delete);

export default router;
