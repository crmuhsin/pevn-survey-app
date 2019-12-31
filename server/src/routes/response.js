import express from 'express';
import Auth from '../middleware/Auth';
import Responses from '../controller/Responses';
var router = express.Router()

router.post('/save', Auth.verifyToken, Responses.save);
router.post('/get-by-id', Auth.verifyToken, Responses.getOne);
router.post('/update', Auth.verifyToken, Responses.update);

export default router;