import { NeonHTTPAdapter } from "@lucia-auth/adapter-postgresql";
import { neon } from "@neondatabase/serverless";

export const db = neon(process.env.POSTGRES_URL??"")//'ep-bitter-frog-a4jtafac-pooler.us-east-1.aws.neon.tech');

db("CREATE TABLE IF NOT EXISTS Users(id TEXT NOT NULL PRIMARY KEY, picture TEXT)");
db(`CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
    user_id TEXT NOT NULL REFERENCES auth_user(id)
)`);
db(`CREATE TABLE IF NOT EXISTS solves (
    userId TEXT NOT NULL,
    questionIndex INTEGER NOT NULL,
    category TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id))`)