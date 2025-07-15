import { NeonHTTPAdapter } from "@lucia-auth/adapter-postgresql";
import { neon } from "@neondatabase/serverless";

export const db = neon(process.env.POSTGRES_URL??"")

db("CREATE TABLE IF NOT EXISTS users(id TEXT NOT NULL PRIMARY KEY, picture TEXT)");
db(`CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
    user_id TEXT NOT NULL REFERENCES users(id)
)`);
db(`CREATE TABLE IF NOT EXISTS solves (
    userId TEXT NOT NULL,
    questionIndex INTEGER NOT NULL,
    category TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id))`)
