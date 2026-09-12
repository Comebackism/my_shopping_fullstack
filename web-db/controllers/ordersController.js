const db = require("../db/db");

exports.getAllOrders = async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM orders');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
