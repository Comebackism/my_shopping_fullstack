# WORAWAT STUDIO — My Shopping Fullstack Web Application

ระบบเว็บแอปพลิเคชันร้านค้าออนไลน์สตรีทแวร์แบบ Full-Stack ที่พัฒนาด้วย **React**, **Express.js**, **PostgreSQL** และ **Chart.js** พร้อมระบบจำแนกสิทธิ์ผู้ใช้งาน (Role-Based Access Control) และแดชบอร์ดสถิติวิเคราะห์สินค้า

---

## 🌟 จุดเด่นและฟีเจอร์หลัก (Features)

### 1. 🎨 หน้าร้านค้าสตรีทแวร์ (Frontend E-Commerce)
- **Design System & Brand Identity**: ออกแบบตามแนวคิด Streetwear Archive คุมโทนสี Dark Mode Obsidian (`#0A0A0F`) ตัดกับสีส้ม Neon Orange (`#FF5500`)
- **Hero Lookbook Campaign**: แบนเนอร์ขนาดใหญ่สไตล์ Tokyo Night Lookbook พร้อมปุ่มเลือกซื้อสินค้าและป้ายสถานะคอลเลกชันใหม่
- **รายการสินค้า 10 หมวดหมู่**: จัดแสดงสินค้าหลากหลาย (T-Shirt, Jacket, Jeans, Hoodie, Pants, Shirt, Accessories, Bags, Vest, Footwear) พร้อมรูปภาพเฉพาะของแต่ละชิ้น
- **ระบบค้นหาและฟิลเตอร์**: กรองสินค้าตามหมวดหมู่ หรือค้นหาตามชื่อและคำอธิบายแบบเรียลไทม์

### 2. 🔐 ระบบยืนยันตัวตนและแยกสิทธิ์ (Authentication & Role Authorization)
- **JWT (JSON Web Token)**: เข้ารหัส Token ในการเข้าสู่ระบบและแนบกับ Request
- **แยกสิทธิ์ Admin และ User**:
  - **User**: สั่งซื้อสินค้า, ดูรายละเอียดสินค้า, เข้าถึงหน้า Home / Products / About / Contact
  - **Admin**: เข้าถึงระบบจัดการร้านค้า (Admin Management), หน้าคำสั่งซื้อ (Orders), รายชื่อลูกค้า (Customers), และกราฟสถิติ (Chart)

### 3. 🛠️ ระบบจัดการหลังบ้านของ Admin (Admin Store Management)
- **จัดการสินค้า (CRUD)**: เพิ่มสินค้าใหม่, แก้ไขข้อมูลสินค้า, และลบสินค้า
- **ปุ่ม Detail (รายละเอียด)**: เปิด Modal ดูข้อมูลเชิงลึกของสินค้า (รูปภาพ, สต็อก, ราคา, คำอธิบาย) ในหน้าเดียว
- **ปุ่ม View (ดูหน้าร้านจริง)**: เปิดดูหน้าสินค้าจริงมุมมองลูกค้าในแท็บใหม่

### 4. 📊 แดชบอร์ดกราฟสถิติ (Data Analytics with Chart.js)
- **Pie Chart (สัดส่วน)**: แสดงสัดส่วนเปอร์เซ็นต์ของสินค้าแต่ละหมวดหมู่ คำนวณร้อยละใน Tooltip
- **Bar Chart (จำนวนแท่ง)**: สลับดูกราฟแท่งเพื่อเปรียบเทียบจำนวนสินค้าคงคลัง
- **Interactive Click**: คลิกที่ชิ้นพายหรือแท่งกราฟเพื่อเชื่อมต่อไปยังหน้ารวมสินค้าในหมวดหมู่นั้นทันที
- **Admin Only**: ป้องกัน Route และ API ด้วย Middleware อนุญาตเฉพาะแอดมินเท่านั้น

---

## 🏗️ โครงสร้างโปรเจกต์ (Project Structure)

```text
my_shopping_fullstack/
├── docs/                           # เอกสารคู่มือแบรนด์และ Design Tokens
│   └── brand-guidelines.md
├── my-react-app/                   # Frontend (React 19 + Tailwind CSS)
│   ├── public/
│   │   └── images/                 # รูปภาพสินค้า, โลโก้ และแบนเนอร์
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminPage.js        # แดชบอร์ดจัดการร้านค้า
│   │   │   ├── ProductTable.js     # ตารางสินค้า + Detail Modal + View Button
│   │   │   ├── ProductChart.js     # กราฟ Pie/Bar Chart
│   │   │   ├── Home.js             # หน้าแรกและ Hero Lookbook
│   │   │   ├── Products.js         # หน้ารวมสินค้าและฟิลเตอร์
│   │   │   ├── ProductDetail.js    # หน้ารายละเอียดสินค้า
│   │   │   ├── Login.js / Register.js
│   │   │   ├── Orders.js / CustomerList.js
│   │   │   ├── Icons.js            # SVG Icons (ไม่ใช้อิโมจิ)
│   │   │   └── WorawatLogo.js      # คอมโพเนนต์โลโก้แบรนด์
│   │   ├── design-tokens.json      # กำหนดค่าโทนสีและ Typography
│   │   ├── index.css               # สไตล์ Tailwind และ Design Tokens
│   │   └── App.js                  # Routing & Navigation
│   └── package.json
├── web-db/                         # Backend (Node.js + Express + PostgreSQL)
│   ├── controllers/
│   │   ├── authController.js       # ระบบ Login / Register
│   │   ├── productsController.js   # API สินค้า + getProductStats
│   │   ├── ordersController.js     # API คำสั่งซื้อ
│   │   └── customersController.js  # API ข้อมูลลูกค้า
│   ├── middleware/
│   │   └── authMiddleware.js       # ตรวจสอบ JWT Token & Admin Role
│   ├── db/
│   │   └── db.js                   # การเชื่อมต่อ PostgreSQL Pool
│   ├── public/images/              # รูปภาพสินค้าและแบนเนอร์ที่ให้บริการผ่าน Static
│   ├── seed.js                     # สคริปต์สร้างตารางและ Seed ข้อมูลเริ่มต้น
│   ├── updateProducts.js           # สคริปต์อัปเดตข้อมูลสินค้า
│   ├── index.js                    # Express Application Server
│   ├── ShoppingAPI 6810210617.postman_collection.json # ไฟล์ Postman ทดสอบ API
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 วิธีการติดตั้งและรันโปรเจกต์ (Getting Started)

### 1. ติดตั้ง Dependencies

**ฝั่ง Backend:**
```bash
cd web-db
npm install
```

**ฝั่ง Frontend:**
```bash
cd my-react-app
npm install --legacy-peer-deps
```

---

### 2. ตั้งค่าฐานข้อมูล (Database Setup)
สร้างไฟล์ `.env` ในโฟลเดอร์ `web-db/`:
```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=shopping_db
DB_PORT=5432
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

รันคำสั่งเพื่อสร้างตารางและใส่ข้อมูลเริ่มต้น:
```bash
cd web-db
node seed.js
node updateProducts.js
```

---

### 3. รันเซิร์ฟเวอร์ (Start Servers)

**เริ่มรัน Backend (Port 5000):**
```bash
cd web-db
npm start   # หรือ node index.js
```

**เริ่มรัน Frontend (Port 3000):**
```bash
cd my-react-app
npm start
```

เข้าใช้งานผ่านเว็บเบราว์เซอร์ที่: [http://localhost:3000](http://localhost:3000)

---

## 👤 บัญชีผู้ใช้สำหรับทดสอบ (Test Accounts)

| ชื่อผู้ใช้ (Username) | รหัสผ่าน (Password) | สิทธิ์ (Role) | การเข้าถึง |
|---|---|---|---|
| `admin` | `admin123` | **admin** | สิทธิ์เต็ม: จัดการสินค้า, รายการคำสั่งซื้อ, ลูกค้า, กราฟสถิติ |
| `alice` | `alice` | **user** | สิทธิ์ทั่วไป: เลือกชมสินค้าและสั่งซื้อ |

---

## 🛠️ เทคโนโลยีที่ใช้งาน (Tech Stack)

- **Frontend**: React 19, React Router v7, Tailwind CSS, Chart.js, react-chartjs-2, Axios
- **Backend**: Node.js, Express.js, JSON Web Token (jsonwebtoken), bcryptjs, CORS, Dotenv
- **Database**: PostgreSQL (pg pool)
- **API Testing**: Postman Collection
- **Version Control**: Git & GitHub

---

## 📄 ลิขสิทธิ์ (License)
จัดทำขึ้นเพื่อการศึกษา รายวิชา Modern Web Application Development © 2026 WORAWAT STUDIO
