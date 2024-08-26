

import { User } from "../models/user.model.js";
import { Attendance } from "../models/attendance.model.js";

const getAllAttendance = async (req, res) => {
    const userid = req.session.userid;

    const user = await User.findById(userid);

    if (!user) {
        console.log("User not found");
        return res.status(401).json({
            message: "User not found" 
        })
    }

    if (user.username !== 'admin') {
        console.log("User not admin");
        return res.status(401).json({
            message: "User not admin" 
        })
    }

    const attendanceRecords = await Attendance.find();
    return res.status(200).json({
        attendanceRecords,
        user: user.username
    });
}

const getUserAttendance = async (req, res) => {
    const userId = req.session.userid;
    const user = await User.findById(userId);

    if (!user) {
        console.log("User not found");
        return res.status(404).send('User not found');
    }

    const attendanceRecords = await Attendance.find({ user: user.username });
    return res.status(200).json({
        username: user.username,
        attendanceRecords
    });
}

export default {
    getUserAttendance,
    getAllAttendance
}
