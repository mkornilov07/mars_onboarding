import Database from 'better-sqlite3';
export const db = new Database('users.db');
db.pragma('journal_mode = WAL');
db.prepare("CREATE TABLE IF NOT EXISTS Users(id TEXT NOT NULL PRIMARY KEY, picture TEXT)").run();
db.prepare(`CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
)`).run();
db.prepare(`CREATE TABLE IF NOT EXISTS solves (
    userId TEXT NOT NULL,
    questionIndex INTEGER NOT NULL,
    category TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id))`).run()