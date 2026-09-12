import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    api.get("/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError(err.message || "Cannot load orders");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center gap-3 text-sm font-medium text-slate-500">
          <svg className="h-5 w-5 animate-spin text-slate-700" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          กำลังโหลดรายการคำสั่งซื้อ...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-sm text-rose-700">
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          รายการสั่งซื้อ (Orders)
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          ประวัติการสั่งซื้อและสถานะคำสั่งซื้อทั้งหมดในระบบ ({orders.length} รายการ)
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-6 py-3.5 font-semibold text-slate-900 text-xs uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3.5 font-semibold text-slate-900 text-xs uppercase tracking-wider">
                Customer ID
              </th>
              <th className="px-6 py-3.5 font-semibold text-slate-900 text-xs uppercase tracking-wider">
                วันที่สั่งซื้อ
              </th>
              <th className="px-6 py-3.5 font-semibold text-slate-900 text-xs uppercase tracking-wider">
                สถานะ
              </th>
              <th className="px-6 py-3.5 font-semibold text-slate-900 text-xs uppercase tracking-wider text-right">
                ยอดรวม (บาท)
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="transition hover:bg-slate-50/60">
                <td className="px-6 py-4 font-bold text-slate-900">#{order.id}</td>
                <td className="px-6 py-4 text-slate-600">Customer #{order.customer_id}</td>
                <td className="px-6 py-4 text-slate-600">
                  {new Date(order.order_date).toLocaleDateString("th-TH")}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      order.status?.toLowerCase() === "completed"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : order.status?.toLowerCase() === "processing"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-bold text-slate-900">
                  ฿ {Number(order.total).toLocaleString()}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                  ไม่พบรายการคำสั่งซื้อ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
