import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([
    "Clothing",
    "Accessories",
    "Gadget",
    "Electronics",
    "Footwear"
  ]);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState("");

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 1. ดึงหมวดหมู่ทั้งหมดที่มีในระบบ
    api.get("/api/products", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          const dbCats = res.data
            .map((p) => p.category)
            .filter((c) => Boolean(c) && typeof c === "string");
          setCategories((prev) => Array.from(new Set([...prev, ...dbCats])));
        }
      })
      .catch(() => {});

    // 2. ดึงข้อมูลสินค้าที่ต้องการแก้ไข
    api.get(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        const p = res.data;
        setName(p.name || "");
        const cat = p.category || "";
        setCategory(cat);
        if (cat) {
          setCategories((prev) => Array.from(new Set([...prev, cat])));
        }
        setDescription(p.description || "");
        setPrice(p.price || "");
        setStock(p.stock != null ? p.stock : 0);
        const img = p.image || p.image_url || "";
        setImage(img);
      })
      .catch((err) => {
        setMessage({ type: "error", text: "โหลดข้อมูลสินค้าไม่สำเร็จ" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // ฟังก์ชัน Compress รูปภาพโดยใช้ Canvas (ลดขนาดก่อนส่ง API)
  const compressImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX_SIZE = 800; // max px
        let w = img.width;
        let h = img.height;
        if (w > MAX_SIZE || h > MAX_SIZE) {
          if (w > h) { h = Math.round((h * MAX_SIZE) / w); w = MAX_SIZE; }
          else { w = Math.round((w * MAX_SIZE) / h); h = MAX_SIZE; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL("image/jpeg", 0.8);
        callback(compressed);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "กรุณาเลือกไฟล์ที่เป็นรูปภาพเท่านั้น (JPG, PNG, WebP)" });
      return;
    }

    compressImage(file, (compressed) => {
      setImage(compressed);
      setMessage({ type: "", text: "" });
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        compressImage(file, (compressed) => {
          setImage(compressed);
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCategory = isCustomCategory 
      ? customCategoryName.trim() 
      : category.trim();

    if (!name || !selectedCategory || price === "") {
      setMessage({ type: "error", text: "กรุณากรอกข้อมูลสำคัญ (ชื่อ, หมวดหมู่ และราคา)" });
      return;
    }

    setSubmitting(true);
    setMessage({ type: "", text: "" });

    const token = localStorage.getItem("token");
    api.put(`/api/products/${id}`, {
      name: name.trim(),
      category: selectedCategory,
      description: description.trim(),
      price: Number(price),
      stock: Number(stock) || 0,
      image,
      image_url: image
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setMessage({ type: "success", text: `อัปเดตข้อมูลสินค้า ID: ${id} เรียบร้อยแล้ว` });
        setTimeout(() => navigate("/admin/products"), 1200);
      })
      .catch((err) => {
        let msg = "บันทึกข้อมูลไม่สำเร็จ";
        if (err && err.response && err.response.data && err.response.data.error) {
          msg = err.response.data.error;
        }
        setMessage({ type: "error", text: msg });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center">
        <div className="inline-flex items-center gap-2 text-slate-500 font-medium">
          <svg className="animate-spin h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>กำลังโหลดข้อมูลสินค้า...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link to="/admin/products" className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition mb-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            กลับสู่รายการสินค้า
          </Link>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">แก้ไขข้อมูลสินค้า</h2>
            <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 border border-slate-200">
              ID: #{id}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">ปรับปรุงข้อมูลและรูปภาพของสินค้ารายการนี้</p>
        </div>
      </div>

      {/* Alert Banner */}
      {message.text && (
        <div className={`mb-6 flex items-center gap-3 rounded-xl p-4 text-sm font-medium border ${
          message.type === "success" 
            ? "border-emerald-200 bg-emerald-50/80 text-emerald-800" 
            : "border-red-200 bg-red-50/80 text-red-800"
        }`}>
          {message.type === "success" ? (
            <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Main Form Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Product Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              ชื่อสินค้า <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="ชื่อสินค้า" 
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition outline-none text-sm font-medium"
            />
          </div>

          {/* Category Section (Dropdown + Add New Option) */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                หมวดหมู่สินค้า <span className="text-red-500">*</span>
              </label>
              {!isCustomCategory ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomCategory(true);
                    setCustomCategoryName("");
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  + เพิ่มหมวดใหม่
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomCategory(false);
                    setCategory(categories[0] || "Clothing");
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline transition"
                >
                  เลือกจากหมวดหมู่เดิม
                </button>
              )}
            </div>

            {!isCustomCategory ? (
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => {
                    if (e.target.value === "__NEW__") {
                      setIsCustomCategory(true);
                      setCustomCategoryName("");
                    } else {
                      setCategory(e.target.value);
                    }
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition outline-none text-sm font-medium appearance-none cursor-pointer pr-10 shadow-2xs"
                >
                  <option value="" disabled>-- เลือกหมวดหมู่ --</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="__NEW__" className="font-semibold text-blue-600">
                    + เพิ่มหมวดหมู่ใหม่...
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    required
                    autoFocus
                    value={customCategoryName}
                    onChange={(e) => setCustomCategoryName(e.target.value)}
                    placeholder="พิมพ์ชื่อหมวดหมู่ใหม่ เช่น Shoes, Stationary"
                    className="w-full rounded-xl border border-slate-900 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-slate-900/10 transition outline-none text-sm font-medium"
                  />
                </div>
                <p className="text-xs text-slate-500">
                  หมวดหมู่นี้จะถูกบันทึกและแสดงใน Dropdown สำหรับสินค้าชิ้นต่อไปอัตโนมัติ
                </p>
              </div>
            )}
          </div>

          {/* Price & Stock Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                ราคา (บาท) <span className="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                required 
                min="0" 
                step="0.01"
                value={price} 
                onChange={e => setPrice(e.target.value)} 
                placeholder="590" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition outline-none text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                จำนวนคงเหลือ (Stock)
              </label>
              <input 
                type="number" 
                min="0" 
                value={stock} 
                onChange={e => setStock(e.target.value)} 
                placeholder="50" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition outline-none text-sm font-medium"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              รายละเอียดสินค้า
            </label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="รายละเอียดสินค้า..." 
              rows="3" 
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition outline-none text-sm leading-relaxed"
            ></textarea>
          </div>

          {/* Image Upload / Input Section */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/30 p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                รูปภาพสินค้า
              </label>
            </div>

            {/* Mode 1: File Upload */}
            <div>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />

                {!image ? (
                  <div 
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 text-center hover:border-slate-800 hover:bg-slate-50/80 transition cursor-pointer group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="mt-3">
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                        คลิกเพื่อเลือกไฟล์รูปภาพใหม่
                      </span>
                      <span className="text-sm text-slate-500"> หรือลากรูปมาวางที่นี่</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">รองรับไฟล์ PNG, JPG, JPEG, WebP</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                    <img 
                      src={image.startsWith("http") || image.startsWith("data:") ? image : `http://localhost:5000${image}`} 
                      alt="Preview" 
                      className="h-20 w-20 rounded-lg object-cover border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                          รูปปัจจุบัน
                        </span>
                        <span className="text-xs text-slate-400 truncate">พร้อมบันทึก</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">สามารถเลือกเปลี่ยนรูปใหม่หรือลบรูปออกได้</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current && fileInputRef.current.click()} 
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
                      >
                        เปลี่ยนรูป
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setImage("")} 
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition"
                      >
                        ลบรูป
                      </button>
                    </div>
                  </div>
                )}
              </div>

          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Link 
              to="/admin/products"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
            >
              ยกเลิก
            </Link>
            <button 
              type="submit" 
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 transition shadow-xs"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>กำลังบันทึก...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>บันทึกการแก้ไข</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
