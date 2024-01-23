import { DB_NAME } from '../constants.js';
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.DATABASE_URL}/${DB_NAME}?retryWrites=true&w=majority`
        );
        console.log(`\n MongoDB Connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(` MongoDB connection Failed !! Error: `, error);
        process.exit(1);
    }
};

export default connectDB;
