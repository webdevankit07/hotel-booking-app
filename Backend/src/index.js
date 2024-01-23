import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './db/connectDB.js';

dotenv.config();

(async () => {
    try {
        await connectDB();

        // server running...
        app.listen(process.env.PORT || 8000, () => {
            console.log(` Server listening on PORT ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(`Something error happened while connecting to server: \n ${error}`);
    }
})();
