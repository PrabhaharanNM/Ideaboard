
import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/admin/all', userController.getAllAttendance);
router.get('/guards/myattendance', userController.getUserAttendance);

export default router;
