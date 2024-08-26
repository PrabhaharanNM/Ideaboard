
import express from 'express';
import multer from 'multer';
import attendanceController from '../controllers/attendance.controller.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), attendanceController.checkInAttendance);

export default router;
