import dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');

dotenv.config({ path: envPath });

export default {
PORT:process.env.PORT || 5000,
MONGO_URI:process.env.MONGO_URI || "",
NODE_ENV:process.env.NODE_ENV || "development",

sslc_STORE_ID:process.env.SSLC_STORE_ID,
sslc_STORE_PASS:process.env.SSLC_STORE_PASS,

}