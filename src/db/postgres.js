// src/db/postgres.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
});

// Helper: test connection
export async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Postgres connected:", res.rows[0]);
  } catch (err) {
    console.error("❌ Postgres connection failed:", err);
  }
}

// Optional helper functions
export async function addUser(user) {
  const { id, username, first_name, last_name } = user;
  const query = `
    INSERT INTO users (telegram_id, username, first_name, last_name)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (telegram_id) DO NOTHING
    RETURNING *;
  `;
  const res = await pool.query(query, [id, username, first_name, last_name]);
  return res.rows[0];
}

export async function logVideoRequest(userId, url, platform, type) {
  const query = `
    INSERT INTO video_requests (user_id, url, platform, type)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const res = await pool.query(query, [userId, url, platform, type]);
  return res.rows[0];
}

export async function updateVideoRequest(id, status, result = null, error = null) {
  const query = `
    UPDATE video_requests
    SET status=$2, result=$3, error=$4, completed_at=NOW()
    WHERE id=$1
    RETURNING *;
  `;
  const res = await pool.query(query, [id, status, result, error]);
  return res.rows[0];
}