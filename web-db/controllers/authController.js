const db = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role || 'user'
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      role: user.role || 'user',
      user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        role: user.role || 'user'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

const register = async (req, res) => {
  const { username, password, fullname } = req.body;

  // 1. ตรวจสอบ 3 ช่องบังคับ: Username, Password, Fullname
  if (!username || !username.trim()) {
    return res.status(400).json({
      success: false,
      error: "Username ว่าง หรือไม่ได้ระบุ"
    });
  }
  if (!password || !password.trim()) {
    return res.status(400).json({
      success: false,
      error: "Password ว่าง หรือไม่ได้ระบุ"
    });
  }
  if (!fullname || !fullname.trim()) {
    return res.status(400).json({
      success: false,
      error: "Fullname ว่าง หรือไม่ได้ระบุ"
    });
  }

  try {
    // 2. ตรวจสอบ Username ซ้ำ
    const existing = await db.query(
      "SELECT id FROM users WHERE username = $1",
      [username.trim()]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Username ซ้ำ กรุณาใช้ชื่ออื่น"
      });
    }

    // 3. เข้ารหัส Password ด้วย bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. กำหนดค่า role เป็น 'user' อัตโนมัติ
    const role = "user";

    const result = await db.query(
      `INSERT INTO users (username, password, fullname, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, fullname, role`,
      [username.trim(), hashedPassword, fullname.trim(), role]
    );

    return res.status(201).json({
      success: true,
      message: "Register success",
      user: result.rows[0]
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error: " + error.message
    });
  }
};

module.exports = { login, register };
