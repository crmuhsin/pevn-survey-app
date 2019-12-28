import express from 'express';
import Auth from '../middleware/Auth';
import Questions from '../controller/Questions';
var router = express.Router()

router.post('/save', Auth.verifyToken, Questions.save);
router.post('/get-by-id', Auth.verifyToken, Questions.getOne);
router.post('/update', Auth.verifyToken, Questions.update);

export default router;