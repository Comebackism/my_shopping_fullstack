const db = require("../db/db");

exports.getAllCustomers = async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM customers');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getCustomerById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM customers WHERE id = $1', [id]);
    if (rows.length === 0) {
      const err = new Error(`Customer with id=${id} not found`);
      err.status = 404;
      throw err;
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.getCustomerOrders = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkCustomer = await db.query('SELECT * FROM customers WHERE id = $1', [id]);
    if (checkCustomer.rows.length === 0) {
      const err = new Error(`Customer with id=${id} not found`);
      err.status = 404;
      throw err;
    }

    const { rows } = await db.query(`
      SELECT o.*, c.name as customer_name, c.email 
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE c.id = $1
    `, [id]);

    res.json(rows);
  } catch (err) {
    next(err);
  }
};
