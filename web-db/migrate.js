const pool = require("./db/db");

const migrate = async () => {
  try {
    console.log("Running migration: add image and description columns to products...");

    // เพิ่มคอลัมน์ description ถ้ายังไม่มี
    await pool.query(`
      ALTER TABLE products
      ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
    `);

    // เพิ่มคอลัมน์ image ถ้ายังไม่มี
    await pool.query(`
      ALTER TABLE products
      ADD COLUMN IF NOT EXISTS image TEXT DEFAULT '';
    `);

    // เพิ่มคอลัมน์ image_url เพื่อรองรับทั้ง image และ image_url ตามสไลด์
    await pool.query(`
      ALTER TABLE products
      ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '';
    `);
    await pool.query(`
      UPDATE products
      SET image_url = image
      WHERE (image_url IS NULL OR image_url = '') AND image IS NOT NULL;
    `);

    // เพิ่มคอลัมน์ role ในตาราง users ถ้ายังไม่มี
    console.log("Running migration: add role column to users...");
    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';
    `);

    // กำหนด role ให้ user เดิม
    await pool.query(`
      UPDATE users
      SET role = 'admin'
      WHERE username = 'admin';
    `);

    await pool.query(`
      UPDATE users
      SET role = 'user'
      WHERE role IS NULL;
    `);

    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await pool.end();
  }
};

migrate();
