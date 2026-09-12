import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api.get("/api/products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError(err.message || "Cannot load products");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  // Handle Filtering
  useEffect(() => {
    let result = products;

    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => (p.category || "").toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, products]);

  // Extract unique categories
  const categories = ["all", ...new Set(products.map((p) => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center gap-3 text-sm font-medium text-slate-500">
          <svg className="h-5 w-5 animate-spin text-slate-700" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          กำลังโหลดรายการสินค้า...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-sm text-rose-700">
        <p className="font-semibold">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Filter Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            คลังสินค้าทั้งหมด
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            พบสินค้าคุณภาพจำนวน {filteredProducts.length} รายการ
          </p>
        </div>

        {/* Search input */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="ค้นหาชื่อสินค้า..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Category Pills */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-slate-900 text-white font-semibold"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {cat === "all" ? "ทั้งหมด" : cat}
            </button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center">
          <p className="text-sm font-medium text-slate-500">ไม่พบสินค้าที่ตรงกับการค้นหา</p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const imgSrc = product.image || product.image_url;
            return (
              <div
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-slate-300 hover:shadow-xs"
              >
                {/* Product Image */}
                <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-slate-100">
                  {imgSrc ? (
                    <img
                      src={
                        imgSrc.startsWith("data:") || imgSrc.startsWith("http")
                          ? imgSrc
                          : `http://localhost:5000${imgSrc}`
                      }
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/tshirt.jpg";
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                      ไม่มีรูปภาพ
                    </div>
                  )}

                  {product.category && (
                    <span className="absolute top-2.5 left-2.5 rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-slate-700 shadow-2xs backdrop-blur-xs">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-2 pt-4">
                  <div className="flex-1">
                    <Link
                      to={`/products/${product.id}`}
                      className="font-bold text-slate-900 transition hover:text-blue-600 block text-base"
                    >
                      {product.name}
                    </Link>
                    {product.description && (
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      <span className="text-xs text-slate-400">ราคา</span>
                      <p className="text-lg font-bold text-slate-900">
                        ฿ {Number(product.price).toLocaleString()}
                      </p>
                    </div>

                    <Link
                      to={`/products/${product.id}`}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-900 hover:text-white"
                    >
                      ดูรายละเอียด
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
