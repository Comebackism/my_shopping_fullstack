import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import api from "../api";
import { EditIcon } from "./Icons";

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAdminPath = location.pathname.startsWith("/admin");

  const token = localStorage.getItem("token");
  let isAdmin = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      isAdmin = payload.role === "admin";
    } catch {
      isAdmin = false;
    }
  }

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        setError(err.message || "Cannot load product");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-flex items-center gap-3 text-sm font-medium text-slate-500">
          <svg className="h-5 w-5 animate-spin text-slate-700" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          กำลังโหลดข้อมูลสินค้า...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
        <h2 className="text-lg font-bold text-rose-800">ไม่พบสินค้าที่คุณต้องการ</h2>
        <p className="mt-1 text-xs text-rose-600">{error || "สินค้านี้อาจถูกลบหรือไม่มีอยู่ในระบบ"}</p>
        <Link
          to={isAdminPath ? "/admin/products" : "/products"}
          className="mt-4 inline-block rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
        >
          {isAdminPath ? "กลับสู่ระบบจัดการสินค้า" : "กลับสู่หน้ารวมสินค้า"}
        </Link>
      </div>
    );
  }

  const imgSrc = product.image || product.image_url;

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link to="/" className="hover:text-slate-900">หน้าแรก</Link>
        <span>/</span>
        {isAdminPath ? (
          <Link to="/admin/products" className="text-purple-700 font-semibold hover:text-purple-900">
            จัดการสินค้า (Admin)
          </Link>
        ) : (
          <Link to="/products" className="hover:text-slate-900">สินค้า</Link>
        )}
        <span>/</span>
        <span className="text-slate-900 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Admin Quick Action Bar when accessed in Admin mode */}
      {isAdminPath && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-purple-50 border border-purple-200/80 px-5 py-3.5 text-xs shadow-2xs">
          <div className="flex items-center gap-2 text-purple-950 font-bold">
            <span className="flex h-2.5 w-2.5 rounded-full bg-purple-600 animate-pulse"></span>
            <span>โหมดผู้ดูแลระบบ: รายละเอียดสินค้าแบบละเอียด (Admin Detail)</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="font-medium text-purple-700 hover:text-purple-950 transition"
            >
              &larr; กลับสู่ตารางสินค้า
            </Link>
            <span className="text-purple-200">|</span>
            <Link
              to={`/products/${product.id}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-700 hover:text-indigo-950 transition"
            >
              ดูหน้าเว็บจริง (Live View) &rarr;
            </Link>
            <Link
              to={`/admin/products/${product.id}/edit`}
              className="inline-flex items-center gap-1 rounded-lg bg-purple-700 px-3.5 py-1.5 text-white font-semibold hover:bg-purple-800 transition shadow-2xs"
            >
              <EditIcon className="w-3.5 h-3.5" />
              <span>แก้ไขสินค้านี้</span>
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
        {/* Left Column: Image */}
        <div className="lg:col-span-6">
          <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
            {imgSrc ? (
              <img
                src={
                  imgSrc.startsWith("data:") || imgSrc.startsWith("http")
                    ? imgSrc
                    : `http://localhost:5000${imgSrc}`
                }
                alt={product.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/tshirt.jpg";
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                ไม่มีรูปภาพสินค้า
              </div>
            )}
            {product.category && (
              <span className="absolute top-3 left-3 rounded-md bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-2xs backdrop-blur-xs">
                {product.category}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="flex flex-col lg:col-span-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {product.category || "General"}
            </span>
            <h1 className="mt-1.5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900">
                ฿ {Number(product.price).toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">รวมภาษีมูลค่าเพิ่มแล้ว</span>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              รายละเอียดสินค้า
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
              {product.description || "สินค้าผ้าฝ้ายพรีเมียม ตัดเย็บปราณีต สวมใส่สบาย ระบายอากาศได้ดีเยี่ยม"}
            </p>
          </div>

          {/* Specifications */}
          <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-xs">
            <div>
              <span className="text-slate-400">สถานะสต็อก</span>
              <p className="font-semibold text-slate-800 mt-0.5">
                {product.stock > 0 ? `มีสินค้า (${product.stock} ชิ้น)` : "สินค้าหมดชั่วคราว"}
              </p>
            </div>
            <div>
              <span className="text-slate-400">รหัสสินค้า</span>
              <p className="font-semibold text-slate-800 mt-0.5">#{product.id}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3 pt-auto">
            <button
              onClick={() => alert(`เพิ่ม "${product.name}" ลงในตะกร้าเรียบร้อยแล้ว`)}
              disabled={product.stock <= 0}
              className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {product.stock > 0 ? "เพิ่มลงในตะกร้าสินค้า" : "สินค้าหมดชั่วคราว"}
            </button>

            {isAdmin && (
              <Link
                to={`/admin/products/${product.id}/edit`}
                className="flex items-center justify-center gap-1.5 w-full rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <EditIcon className="w-3.5 h-3.5" />
                <span>แก้ไขข้อมูลสินค้านี้ (Admin)</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
