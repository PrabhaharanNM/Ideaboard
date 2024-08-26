import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    user: { 
        type: String, 
        required: true
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    selfie: { 
        type: String, 
        required: true 
    },
    latitude: { 
        type: Number, 
        required: true 
    },
    longitude: { 
        type: Number, 
        required: true 
    }
});

export const Attendance = mongoose.model('Attendance', AttendanceSchema);