
import { User } from "../models/user.model.js";
import { Attendance } from "../models/attendance.model.js";
import moment from 'moment';

const checkInAttendance = async (req, res) => {
    console.log("Check In post Endpoint hit");
    const { latitude, longitude } = req.body;
    const userid = req.session.userid;
    const user = await User.findById(userid);

    if (!user) {
        console.log("User not found");
        return res.status(401).json({
            message: "User not found"
        });
    }

    const oneHourAgo = moment().subtract(1, 'hour');
    if (user.lastSubmitted && moment(user.lastSubmitted).isAfter(oneHourAgo)) {
        return res.status(400).send('You can only submit once per hour');
    }

    try {
        const attendance = new Attendance({
            user: user.username,
            selfie: req.file.path,
            latitude,
            longitude
        });

        // save the attendance
        try {
            await attendance.save();
        } catch (error) {
            console.log("Error saving attendance");
            return res.status(500).json({
                message: error.message
            });
        }

        // update the user's lastSubmitted to the submitted time
        user.lastSubmitted = Date.now();
        await user.save();
        return res.status(201).send('Attendance submitted successfully');
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export default {
    checkInAttendance
}
