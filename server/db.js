// db.js - SQLite database setup and helper
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'intake.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite:', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create table if not exists
const initSql = `CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  contactMethod TEXT NOT NULL,
  contactTime TEXT,
  message TEXT NOT NULL,
  createdAt TEXT NOT NULL
)`;

db.run(initSql, (err) => {
  if (err) console.error('Failed to create table:', err);
});

module.exports = db;
