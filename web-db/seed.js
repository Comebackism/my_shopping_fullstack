const pool = require("./db/db");

const seedDatabase = async () => {
  try {
    console.log("Seeding database...");

    // Customers
    await pool.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE
      );
    `);

    // Products
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        price NUMERIC(10, 2),
        category VARCHAR(50),
        stock INT
      );
    `);

    // Orders
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES customers(id),
        order_date DATE,
        status VARCHAR(50),
        total NUMERIC(10, 2)
      );
    `);

    // Order Items
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders_items (
        id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders(id),
        product_id INT REFERENCES products(id),
        quantity INT,
        price NUMERIC(10, 2)
      );
    `);

    // Users
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        fullname VARCHAR(100),
        role VARCHAR(50) DEFAULT 'user'
      );
    `);

    // Insert records into customers
    await pool.query(`
      INSERT INTO customers (id, name, email) VALUES
      (1, 'John Doe', 'john@example.com'),
      (2, 'Jane Smith', 'jane@example.com'),
      (3, 'Alice Johnson', 'alice@example.com'),
      (4, 'Thanaphat Maneenual', 'thanaphat.m@example.com'),
      (5, 'Nipat Patchamongkon', 'nipat.p@example.com'),
      (6, 'Annop Phanchai', 'annop.p@example.com'),
      (7, 'Phromamorn Phongprasroed', 'phromamorn.p@example.com'),
      (8, 'Ratchapong Plangrat', 'ratchapong.p@example.com'),
      (9, 'Kacha Punturat', 'kacha.p@example.com'),
      (10, 'Pijak Rattanapiboon', 'pijak.r@example.com')
      ON CONFLICT (id) DO NOTHING;
    `);

    // Insert records into products
    await pool.query(`
      INSERT INTO products (id, name, price, category, stock, description, image, image_url) VALUES
      (1, 'Worawat Heavyweight Oversized Tee', 490.00, 'T-Shirt', 50, 'เสื้อยืดทรงโอเวอร์ไซส์ผ้า Cotton Comb 100% หนา 260 GSM เนื้อผ้าเนียนนุ่ม อยู่ทรงสวย ไม่ย้วยง่าย เหมาะกับอากาศเมืองไทย', '/images/tshirt.jpg', '/images/tshirt.jpg'),
      (2, 'Streetwear MA-1 Bomber Jacket', 1890.00, 'Jacket', 20, 'แจ็คเก็ตบอมเบอร์ผ้าไนลอนพรีเมียม กันลมและละอองน้ำ ซับในสีส้มเอกลักษณ์ ซิปโลหะทนทาน เสริมลุคสตรีทสุดเท่', '/images/jacket.jpg', '/images/jacket.jpg'),
      (3, 'Vintage Wide-Leg Denim Jeans', 1390.00, 'Jeans', 35, 'กางเกงยีนส์ขากระบอกใหญ่ ฟอกสีเฟดวินเทจอย่างลงตัว ผ้าเดนิม 14 ออนซ์ แข็งแรงทนทาน ใส่สบายไม่อึดอัด', '/images/jeans.jpg', '/images/jeans.jpg'),
      (4, 'Heavyweight Fleece Boxy Hoodie', 1290.00, 'Hoodie', 30, 'เสื้อฮู้ดดี้ทรง Boxy ผ้าฟลีซหนานุ่ม 380 GSM ซับในนุ่มสบาย ฮู้ดสองชั้นตั้งทรงสวย กระเป๋าหน้าขนาดใหญ่จุของได้จุใจ', '/images/hoodie.jpg', '/images/hoodie.jpg'),
      (5, 'Tactical Utility Cargo Pants', 1190.00, 'Pants', 40, 'กางเกงคาร์โก้สไตล์แทคติคอล มีกระเป๋าใส่ของ 6 ช่อง ผ้า Ripstop ป้องกันรอยขีดข่วน เอวยางยืดพร้อมสายรูดปรับระดับได้', '/images/cargo.jpg', '/images/cargo.jpg'),
      (6, 'Relaxed Camp Collar Shirt', 790.00, 'Shirt', 45, 'เสื้อเชิ้ตแขนสั้นคอปกเปิด ผ้าเรยอนผสมคอตตอน ระบายความร้อนดีเยี่ยม สวมใส่สบายในวันพักผ่อนและท่องเที่ยว', '/images/shirt.jpg', '/images/shirt.jpg'),
      (7, 'Signature Low-Profile Baseball Cap', 390.00, 'Accessories', 60, 'หมวกแก๊ปเบสบอลผ้าคอตตอนทวิลล์ ปักโลโก้ W ด้านหน้า ทรงสวยกระชับศีรษะ สายรัดด้านหลังเป็นบัคเคิลทองเหลืองรมดำ', '/images/cap.jpg', '/images/cap.jpg'),
      (8, 'Cordura Street Crossbody Bag', 690.00, 'Bags', 25, 'กระเป๋าสะพายข้างผ้า Cordura กันน้ำ น้ำหนักเบา ช่องใส่ของ 3 ช่องพร้อมซิปกันน้ำ เหมาะสำหรับพกพาโทรศัพท์ กระเป๋าสตางค์', '/images/bag.jpg', '/images/bag.jpg'),
      (9, 'Modular Multi-Pocket Utility Vest', 1490.00, 'Vest', 15, 'เสื้อกั๊กยูทิลิตี้แนวสตรีททหาร ผ้าไนลอนหนาทนทาน มีช่องกระเป๋าซิป 8 ช่อง เหมาะกับการเลเยอร์สไตล์เอาต์ดอร์และสตรีท', '/images/vest.jpg', '/images/vest.jpg'),
      (10, 'Ribbed Cushion Crew Socks (3-Pack)', 290.00, 'Footwear', 80, 'เซ็ตถุงเท้าข้อยาว 3 คู่ ผ้าฝ้ายทอลายริบหนานุ่ม ซับแรงกระแทกบริเวณส้นและปลายเท้า ระบายอากาศดี ไม่อับชื้นตลอดวัน', '/images/socks.jpg', '/images/socks.jpg')
      ON CONFLICT (id) DO NOTHING;
    `);

    // Insert records into orders
    await pool.query(`
      INSERT INTO orders (id, customer_id, order_date, status, total) VALUES
      (1, 1, '2026-08-01', 'Completed', 45990.00),
      (2, 2, '2026-08-03', 'Completed', 35000.00),
      (3, 3, '2026-08-05', 'Pending', 8500.00),
      (4, 4, '2026-08-10', 'Completed', 32000.00),
      (5, 5, '2026-08-11', 'Processing', 40000.00),
      (6, 6, '2026-08-12', 'Pending', 15000.00),
      (7, 7, '2026-08-15', 'Completed', 75000.00)
      ON CONFLICT (id) DO NOTHING;
    `);

    // Insert records into orders_items
    await pool.query(`
      INSERT INTO orders_items (id, order_id, product_id, quantity, price) VALUES
      (1, 1, 1, 1, 35000.00),
      (2, 2, 1, 1, 35000.00),
      (3, 3, 3, 1, 8500.00),
      (4, 4, 4, 1, 32000.00),
      (5, 5, 2, 1, 40000.00),
      (6, 6, 5, 1, 15000.00),
      (7, 7, 1, 1, 35000.00),
      (8, 7, 2, 1, 40000.00)
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await pool.end();
  }
};

seedDatabase();
