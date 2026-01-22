import dotenv from "dotenv";
import app from "./app.js";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
  keepAlive: true,
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

pool.on("error", (err) => {
  console.error("Unexpected PG error", err);
});


server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;
