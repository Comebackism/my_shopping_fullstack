require('dotenv').config();
const db = require('./db/db');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const hash = await bcrypt.hash('admin123', 10);
  await db.query('INSERT INTO users (username, password, fullname, role) VALUES ($1, $2, $3, $4)', ['admin', hash, 'Admin User', 'admin']);
  console.log('Admin created');
  process.exit();
}
createAdmin();
