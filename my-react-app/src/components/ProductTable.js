import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { EyeIcon, DetailIcon, EditIcon } from "./Icons";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    api.get("/api/products", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("ไม่สามารถโหลดข้อมูลสินค้าได้ (อาจต้องเข้าสู่ระบบใหม่)");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = (id, name) => {
    const ok = window.confirm(`ต้องการลบสินค้ารายการ "${name || id}" หรือไม่?`);
    if (!ok) return;

    const token = localStorage.getItem("token");
    api.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        alert(`ลบสินค้าสำเร็จ (ID: ${id})`);
        if (selectedProduct && selectedProduct.id === id) {
          setSelectedProduct(null);
        }
        loadProducts();
      })
      .catch((err) => {
        let msg = "ลบไม่สำเร็จ";
        if (err && err.response && err.response.data && err.response.data.error) {
          msg = err.response.data.error;
        } else if (err.response && err.response.status === 404) {
          msg = "ไม่พบสินค้า";
        }
        alert(msg);
      });
  };

  if (loading) {
    return (
      <div className="py-16 text-center">
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

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
        <p className="font-semibold">{error}</p>
        <button 
          onClick={loadProducts}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Table Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">รายการสินค้าทั้งหมด</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            จัดการ ดูรายละเอียด (Detail), ดูหน้าเว็บจริง (View), แก้ไข (Edit) และลบสินค้า ({products.length} รายการ)
          </p>
        </div>
        <Link 
          to="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 active:scale-[0.99] transition shadow-xs self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>เพิ่มสินค้าใหม่</span>
        </Link>
      </div>

      {/* Table or Empty State */}
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-slate-50/50">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h4 className="mt-3 text-sm font-bold text-slate-800">ยังไม่มีรายการสินค้า</h4>
          <p className="mt-1 text-xs text-slate-500">เริ่มต้นเพิ่มสินค้ารายการแรกเพื่อเปิดการขาย</p>
          <Link 
            to="/admin/products/new"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
          >
            + เพิ่มสินค้าชิ้นแรก
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="py-3.5 pl-5 pr-3 text-xs font-semibold uppercase tracking-wider text-slate-500">ID</th>
                  <th className="px-3 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">รูปภาพ</th>
                  <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">ชื่อสินค้า</th>
                  <th className="px-3 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">หมวดหมู่</th>
                  <th className="px-3 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">ราคา</th>
                  <th className="px-3 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">สต็อก</th>
                  <th className="py-3.5 pl-3 pr-5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((item) => {
                  const imgUrl = item.image || item.image_url;
                  const stockNum = Number(item.stock || 0);

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 pl-5 pr-3 font-mono text-xs font-semibold text-slate-500">
                        #{item.id}
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(item)}
                          className="group relative cursor-pointer"
                          title="คลิกเพื่อดูรายละเอียดสินค้า"
                        >
                          {imgUrl ? (
                            <img 
                              src={imgUrl.startsWith("http") || imgUrl.startsWith("data:") ? imgUrl : `http://localhost:5000${imgUrl}`} 
                              alt={item.name} 
                              className="h-12 w-12 rounded-xl object-cover border border-slate-200 shadow-2xs transition group-hover:scale-105 group-hover:border-sky-400 mx-auto"
                              onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.style.display = 'none'; 
                              }}
                            />
                          ) : (
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-[10px] text-slate-400 font-medium">
                              ไม่มีรูป
                            </div>
                          )}
                        </button>
                      </td>
                      <td className="px-3 py-3.5">
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(item)}
                          className="text-left font-semibold text-slate-900 hover:text-sky-600 transition block"
                        >
                          {item.name}
                        </button>
                        {item.description && (
                          <div className="text-xs text-slate-400 line-clamp-1 max-w-xs mt-0.5">
                            {item.description}
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 text-right font-semibold text-slate-900 whitespace-nowrap">
                        ฿{Number(item.price).toLocaleString()}
                      </td>
                      <td className="px-3 py-3.5 text-center whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          stockNum > 10 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60" 
                            : stockNum > 0 
                            ? "bg-amber-50 text-amber-700 border border-amber-200/60" 
                            : "bg-red-50 text-red-700 border border-red-200/60"
                        }`}>
                          {stockNum} ชิ้น
                        </span>
                      </td>
                      <td className="py-3.5 pl-3 pr-5 text-center whitespace-nowrap">
                        <div className="inline-flex items-center justify-center gap-1.5">
                          {/* 1. Detail Button (ดูรายละเอียดใน Modal) */}
                          <button
                            type="button"
                            onClick={() => setSelectedProduct(item)}
                            title="ดูรายละเอียดสินค้า (Detail)"
                            className="inline-flex items-center gap-1 rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100 hover:border-sky-300 shadow-2xs transition"
                          >
                            <DetailIcon className="w-3.5 h-3.5 text-sky-600" />
                            <span>Detail</span>
                          </button>

                          {/* 2. View Button (เปิดดูหน้าเว็บลูกค้า) */}
                          <Link 
                            to={`/products/${item.id}`}
                            target="_blank"
                            rel="noreferrer"
                            title="เปิดดูหน้าสินค้าบนเว็บ (View)"
                            className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 shadow-2xs transition"
                          >
                            <EyeIcon className="w-3.5 h-3.5 text-indigo-600" />
                            <span>View</span>
                          </Link>

                          {/* 3. Edit Button (แก้ไขสินค้า) */}
                          <Link 
                            to={`/admin/products/${item.id}/edit`} 
                            title="แก้ไขข้อมูลสินค้า (Edit)"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition"
                          >
                            <EditIcon className="w-3.5 h-3.5 text-slate-500" />
                            <span>Edit</span>
                          </Link>

                          {/* 4. Delete Button (ลบสินค้า) */}
                          <button 
                            type="button"
                            onClick={() => handleDelete(item.id, item.name)} 
                            title="ลบสินค้ารายการนี้ (Delete)"
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 hover:border-red-300 shadow-2xs transition"
                          >
                            <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-xs"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/80">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700 font-bold text-xs">
                  #{selectedProduct.id}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-tight">
                    รายละเอียดสินค้า (Product Detail)
                  </h3>
                  <p className="text-[11px] text-slate-500">ข้อมูลสินค้าแบบละเอียดสำหรับการจัดการของ Admin</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
                title="ปิดหน้าต่าง (Esc)"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Product Image Preview */}
                <div className="md:col-span-5">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 border border-slate-200 shadow-2xs">
                    <img
                      src={
                        selectedProduct.image || selectedProduct.image_url
                          ? (selectedProduct.image || selectedProduct.image_url).startsWith("http") || (selectedProduct.image || selectedProduct.image_url).startsWith("data:")
                            ? (selectedProduct.image || selectedProduct.image_url)
                            : `http://localhost:5000${selectedProduct.image || selectedProduct.image_url}`
                          : "/images/tshirt.jpg"
                      }
                      alt={selectedProduct.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/tshirt.jpg";
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 rounded bg-slate-950/80 px-2 py-0.5 text-[10px] font-bold text-white uppercase backdrop-blur-xs">
                      {selectedProduct.category}
                    </div>
                  </div>
                </div>

                {/* Product Information Breakdown */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                      {selectedProduct.category}
                    </span>
                    <h4 className="text-xl font-black text-slate-900 mt-0.5 leading-snug">
                      {selectedProduct.name}
                    </h4>
                    <div className="mt-2 text-2xl font-extrabold text-slate-900">
                      ฿{Number(selectedProduct.price).toLocaleString()}
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">รหัสสินค้า (Product ID):</span>
                      <span className="font-mono font-bold text-slate-800">#{selectedProduct.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">สถานะสต็อก:</span>
                      <span className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                        selectedProduct.stock > 10 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : selectedProduct.stock > 0 
                          ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {selectedProduct.stock} ชิ้น ({selectedProduct.stock > 0 ? 'มีสินค้าพร้อมจำหน่าย' : 'สินค้าหมดชั่วคราว'})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ไฟล์รูปภาพ (Image Path):</span>
                      <span className="font-mono text-slate-700 truncate max-w-[190px]">
                        {selectedProduct.image || selectedProduct.image_url || 'ไม่มี'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      คำอธิบายรายละเอียดสินค้า
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-700 whitespace-pre-line bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                      {selectedProduct.description || "ไม่มีคำอธิบายสำหรับสินค้านี้"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-3.5">
              <Link
                to={`/products/${selectedProduct.id}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition shadow-2xs"
              >
                <EyeIcon className="w-3.5 h-3.5" />
                <span>เปิดดูหน้าร้าน (Live View)</span>
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  to={`/admin/products/${selectedProduct.id}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition shadow-2xs"
                >
                  <EditIcon className="w-3.5 h-3.5" />
                  <span>แก้ไขสินค้านี้</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
