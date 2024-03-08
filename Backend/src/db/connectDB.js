import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
import { DATABASE_URL } from '../conf/index.js';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${DATABASE_URL}/${DB_NAME}?retryWrites=true&w=majority`);
        console.log(`\n MongoDB Connected !! DB: ${process.env.DATABASE_URL}`);
        console.log(` MongoDB Connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(` MongoDB connection Failed !! Error: `, error);
        process.exit(1);
    }
};

export default connectDB;
