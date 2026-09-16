# สคริปต์นำเสนอ — WORAWAT My Shopping Fullstack
## อ่านตามได้เลย เรียงตาม Navbar จากซ้ายไปขวา (~5 นาที)

---

### ⚡ เริ่มต้น — ล็อกอินก่อนนำเสนอ (ไม่นับเวลา)
*(เปิด http://localhost:3000/login → กรอก admin / admin123 → กด Login)*

---

### 🏠 HOME
*(คลิก Home ใน Navbar)*

"สวัสดีครับ โปรเจกต์นี้ชื่อ WORAWAT Studio ครับ เป็น Web Application ร้านค้าออนไลน์สตรีทแวร์แบบ Full-Stack พัฒนาด้วย React ฝั่ง Frontend และ Node.js กับ Express.js ฝั่ง Backend เชื่อมกับฐานข้อมูล PostgreSQL ครับ

ที่เห็น Navbar ด้านบนมีเมนูหลายอย่างที่ผู้ใช้ทั่วไปจะไม่เห็นนะครับ เพราะเมนูพวก Product Stats, Order Stats, Customers, Orders และ Admin จะแสดงเฉพาะตอนล็อกอินด้วยบัญชี Admin เท่านั้น ระบบตรวจสอบสิทธิ์ด้วย JWT Token ครับ พอล็อกอินสำเร็จ Backend จะส่ง Token กลับมา Frontend เก็บไว้ใน localStorage แล้ว decode ออกมาเพื่อตรวจว่า role เป็น admin ไหม ถึงจะเปิดเมนูพิเศษเหล่านี้ให้ครับ

หน้า Home นี้สร้างจากคอมโพเนนต์ Home.js ครับ มีแบนเนอร์ Hero และหมวดสินค้า Featured 6 ประเภท เป็นข้อมูลที่กำหนดไว้ตายตัวใน Component เพราะเป็นส่วน Branding ของร้านครับ"

---

### 🛍️ PRODUCTS
*(คลิก Products ใน Navbar)*

"หน้านี้แสดงสินค้าทั้งหมดในร้านครับ พอหน้าโหลด คอมโพเนนต์ Products.js จะใช้ useEffect เรียก API ไปที่ GET /api/products ผ่าน Axios ครับ Backend รับ Request แล้วรัน SQL Query ว่า SELECT * FROM products แล้วคืนข้อมูลมาเป็น JSON แล้ว React ก็นำมา Map ออกมาเป็น Card แต่ละชิ้น

ช่องค้นหาและปุ่มกรองหมวดหมู่ด้านบนทำงานบน Frontend ล้วนๆ ครับ ไม่ยิง API ใหม่ ใช้ useState กรองจาก Array ที่ดึงมาแล้ว"

*(คลิกเข้าสินค้าชิ้นใดชิ้นหนึ่ง)*

"พอคลิกเข้าสินค้าชิ้นไหน React Router จะดึง ID จาก URL แล้วยิง GET /api/products/:id ดึงข้อมูลชิ้นนั้นโดยเฉพาะครับ หน้า Detail นี้ผู้ใช้ทั่วไปก็เข้าได้ ไม่จำเป็นต้องเป็น Admin"

*(กด Back กลับ)*

---

### ℹ️ ABOUT
*(คลิก About ใน Navbar)*

"หน้า About แนะนำแบรนด์ WORAWAT Studio ครับ เป็นหน้า Static ที่สร้างด้วย React ล้วนๆ ไม่มีการเรียก API ใดๆ ทำงานเป็น Presentation Component ครับ"

---

### 📞 CONTACT
*(คลิก Contact ใน Navbar)*

"หน้า Contact แสดงข้อมูลติดต่อแบรนด์ครับ เหมือนกับ About คือเป็น Static Component ใน React ไม่มีการเชื่อมต่อ Backend ครับ"

---

### 📊 PRODUCT STATS
*(คลิก Product Stats ใน Navbar)*

"หน้านี้แสดงกราฟสถิติสินค้าครับ ใช้ Chart.js ร่วมกับ react-chartjs-2

พอหน้าโหลด useEffect จะยิง GET /api/stats ครับ Backend รัน SQL ว่า SELECT category, COUNT(*) AS total FROM products GROUP BY category แล้วส่งข้อมูลกลับมา Frontend แปลงข้อมูลเป็น Labels และ Data Array แล้วส่งให้ Chart.js วาดกราฟ

ดูได้ 2 แบบครับ แบบ Pie Chart แสดงสัดส่วนเปอร์เซ็นต์ของแต่ละหมวดหมู่ และแบบ Bar Chart เปรียบเทียบจำนวนสินค้าแต่ละหมวดครับ"

*(สลับปุ่ม Pie → Bar ให้เห็น)*

"และถ้าคลิกที่ชิ้นพายหรือแท่งกราฟได้เลยครับ ระบบจะพาไปหน้าสินค้าและกรองหมวดหมู่นั้นให้อัตโนมัติ"

*(คลิกชิ้นกราฟ แล้วกด Back กลับมา)*

---

### 📈 ORDER STATS
*(คลิก Order Stats ใน Navbar)*

"หน้านี้คือส่วนสถิติคำสั่งซื้อแยกรายเดือนครับ Backend ใช้ SQL ฟังก์ชัน TO_CHAR แปลงวันที่ Order เป็นรูปแบบ ปี-เดือน แล้วนับจำนวนแยกตามเดือน ส่งมาให้ Frontend

Frontend จะ Map ข้อมูลให้ครบ 12 เดือน ตั้งแต่ ม.ค. ถึง ธ.ค. เดือนไหนไม่มี Order ก็แสดงเป็น 0 อัตโนมัติ ไม่หายไปครับ

ดูได้ทั้ง Line Chart เพื่อดู Trend แนวโน้ม และ Bar Chart เพื่อเปรียบเทียบครับ"

*(สลับปุ่ม Line → Bar ให้เห็น)*

---

### 👥 CUSTOMERS
*(คลิก Customers ใน Navbar)*

"หน้า Customers แสดงรายชื่อสมาชิกทั้งหมดที่ลงทะเบียนในระบบครับ ดึงจาก GET /api/customers

Route นี้ Backend ป้องกันด้วย Middleware 2 ชั้นครับ ชั้นแรก authenticateToken ตรวจว่า JWT Token ถูกต้องไหม ชั้นสอง isAdmin ตรวจว่า role เป็น admin ไหม ถ้าไม่ผ่านจะได้รับ HTTP 403 Forbidden กลับไปทันที

Password ที่เก็บในฐานข้อมูลเป็น Hash ทั้งหมดด้วย bcryptjs ครับ ไม่มีการเก็บ Password จริง"

---

### 📋 ORDERS
*(คลิก Orders ใน Navbar)*

"หน้า Orders แสดงรายการคำสั่งซื้อทั้งหมดครับ ดึงจาก GET /api/orders ซึ่งก็ป้องกันด้วย Middleware Admin เหมือนกัน ใช้ดูว่ามีใคร Order อะไร วันที่ไหน ยอดรวมเท่าไหร่ครับ"

---

### ⚙️ ADMIN
*(คลิก Admin ใน Navbar)*

"และสุดท้ายคือหน้า Admin Management ครับ ใช้จัดการสินค้าทั้งหมดแบบ CRUD

มีปุ่มสำคัญ 4 ปุ่มสำหรับแต่ละสินค้าครับ
ปุ่ม Detail จะเปิด Modal แสดงข้อมูลเต็มโดยไม่เปลี่ยนหน้า
ปุ่ม View เปิดหน้าสินค้าจริงมุมมองลูกค้าในแท็บใหม่
ปุ่ม Edit ไปหน้าแก้ไขแล้วยิง PUT /api/products/:id ไปอัปเดต PostgreSQL
ปุ่ม Delete ลบสินค้าผ่าน DELETE /api/products/:id มี Dialog ยืนยันก่อนลบครับ"

*(กดปุ่ม Detail สาธิต Modal → ปิด)*

"ทุก Request ที่ยิงไปจาก Admin จะแนบ JWT Token อัตโนมัติผ่าน Axios Interceptor ที่ผมตั้งค่าไว้กลางใน api.js ครับ ไม่ต้องเพิ่ม Header เองทุกครั้ง"

---

### ✅ สรุป

"สรุปโปรเจกต์นี้ทำงานแบบ Full-Stack ครับ ฝั่ง Frontend React รับงาน UI และส่ง HTTP Request ผ่าน Axios ฝั่ง Backend Express รับ Request ตรวจ JWT แล้วคุยกับ PostgreSQL ทุก Route ที่เป็นข้อมูลสำคัญมี Middleware ปิดกั้นทั้งสองฝั่ง และข้อมูลสถิติถูกนำมาแสดงด้วย Chart.js แบบ Interactive ครับ ขอบคุณครับ"

---

> **⏱️ เวลาโดยประมาณ: ~5 นาที 10 วินาที**
