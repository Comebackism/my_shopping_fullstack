const db = require("../db/db");

exports.getAllProducts = async (req, res, next) => {
  const { category, maxPrice } = req.query;
  try {
    let query = 'SELECT * FROM products';
    let params = [];

    if (category && maxPrice) {
      query += ' WHERE category = $1 AND price <= $2';
      params = [category, Number(maxPrice)];
    } else if (category) {
      query += ' WHERE category = $1';
      params = [category];
    } else if (maxPrice) {
      query += ' WHERE price <= $1';
      params = [Number(maxPrice)];
    }

    const { rows } = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    if (rows.length === 0) {
      const err = new Error(`Product with id=${id} not found`);
      err.status = 404;
      throw err;
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  const { name, price, category, stock = 0, description = "", image = "", image_url = "" } = req.body;

  if (!name || !category || price == null || Number(price) < 0 || Number(stock) < 0) {
    const err = new Error('Invalid product data');
    err.status = 400;
    return next(err);
  }

  const finalImg = image || image_url || "";

  try {
    const { rows } = await db.query(
      'INSERT INTO products (name, price, category, stock, description, image, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, Number(price), category, Number(stock) || 0, description, finalImg, finalImg]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, category, stock, description, image, image_url } = req.body;

  if (!name || !category || price == null || Number(price) < 0) {
    const err = new Error('Invalid product data');
    err.status = 400;
    return next(err);
  }

  const finalImg = image !== undefined ? (image || image_url || "") : (image_url || "");

  try {
    const { rows } = await db.query(
      `UPDATE products
       SET name = $1, price = $2, category = $3, stock = $4, description = $5, image = $6, image_url = $7
       WHERE id = $8
       RETURNING *`,
      [name, Number(price), category, Number(stock) || 0, description || "", finalImg, finalImg, id]
    );

    if (rows.length === 0) {
      const err = new Error(`Product with id=${id} not found`);
      err.status = 404;
      throw err;
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );

    if (rows.length === 0) {
      const err = new Error(`Product with id=${id} not found`);
      err.status = 404;
      throw err;
    }

    res.json({ message: `Product id=${id} deleted`, product: rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.getProductStats = async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT category, COUNT(*) AS total FROM products GROUP BY category"
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

