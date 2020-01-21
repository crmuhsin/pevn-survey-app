import express from 'express';
import Auth from '../middleware/Auth';
import Survey from '../controller/Survey';
var router = express.Router()

router.post('/save', Auth.verifyToken, Survey.save);
router.post('/get-list', Auth.verifyToken, Survey.getAll);
router.post('/get-list-unauth', Survey.getAll);
router.post('/get-by-id', Survey.getOne);
router.post('/update', Auth.verifyToken, Survey.update);
router.post('/share', Auth.verifyToken, Survey.share);
router.post('/delete', Auth.verifyToken, Survey.delete);
router.post('/check-slug', Auth.verifyToken, Survey.checkUniqueSlug);

export default router;