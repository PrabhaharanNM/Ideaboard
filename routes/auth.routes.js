
import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/info', authController.getAuthInfo);
router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogout);
router.get('/getimage/:image', authController.getImage);

export default router;
