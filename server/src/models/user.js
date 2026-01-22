import pkg from "pg";
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
pool.on("error", (err) => {
  console.error("Unexpected PG pool error", err);
});

export default pool;
