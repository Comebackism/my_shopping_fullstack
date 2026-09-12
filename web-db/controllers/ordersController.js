const db = require("../db/db");

exports.getAllOrders = async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM orders ORDER BY order_date DESC');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getOrderMonthlyStats = async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT TO_CHAR(order_date, 'YYYY-MM') AS month, COUNT(*) AS total
      FROM orders
      WHERE order_date IS NOT NULL
      GROUP BY month
      ORDER BY month ASC
    `);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};
