import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import ProductTable from "./ProductTable";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";
import ProductDetail from "./ProductDetail";
import ProductChart from "./ProductChart";

export default function AdminPage() {
  const location = useLocation();

  const isNew = location.pathname.includes("/admin/products/new");
  const isEdit = location.pathname.includes("/edit");
  const isChart = location.pathname.includes("/admin/chart");

  return (
    <div className="mx-auto max-w-6xl pb-12">
      {/* Top Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            ระบบจัดการร้านค้า (Admin Management)
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600 border border-slate-200/70 self-start md:self-auto">
          <Link 
            to="/admin/products"
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition ${
              !isNew && !isEdit && !isChart
                ? "bg-white text-slate-900 shadow-2xs font-bold" 
                : "hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>รายการสินค้า</span>
          </Link>

          <Link 
            to="/admin/chart"
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition ${
              isChart
                ? "bg-white text-slate-900 shadow-2xs font-bold" 
                : "hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>กราฟสถิติ (Chart)</span>
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <Routes>
        <Route index element={<ProductTable />} />
        <Route path="products" element={<ProductTable />} />
        <Route path="products/new" element={<ProductCreate />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="products/:id/edit" element={<ProductEdit />} />
        <Route path="chart" element={<ProductChart />} />
      </Routes>
    </div>
  );
}
