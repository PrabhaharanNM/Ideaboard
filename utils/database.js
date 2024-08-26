
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connectToDB = async () => {

    const clientOptions = {
        serverApi: {
            version: '1',
            strict: true,
            deprecationErrors: true
        },
        dbName: 'attendance'
    };

    try {
        await mongoose.connect(process.env.MONGO_URI, clientOptions);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectToDB