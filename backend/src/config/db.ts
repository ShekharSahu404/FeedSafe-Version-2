import { Pool } from "pg";
import { env } from './env'

const pool = new Pool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
});

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Database connected successfully"); // release connection back to pool
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};

export default pool;
