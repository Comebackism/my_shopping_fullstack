import React, { useEffect, useState } from "react";
import api from "../api";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/customers")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        setError(err.message || "Cannot load customers");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center gap-3 text-sm font-medium text-slate-500">
          <svg className="h-5 w-5 animate-spin text-slate-700" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          กำลังโหลดรายชื่อลูกค้า...
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
          รายชื่อลูกค้า (Customers)
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          ข้อมูลลูกค้าทั้งหมดในระบบ ({customers.length} คน)
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-6 py-3.5 font-semibold text-slate-900 text-xs uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3.5 font-semibold text-slate-900 text-xs uppercase tracking-wider">
                ชื่อ - นามสกุล
              </th>
              <th className="px-6 py-3.5 font-semibold text-slate-900 text-xs uppercase tracking-wider">
                อีเมล
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {customers.map((customer) => (
              <tr key={customer.id} className="transition hover:bg-slate-50/60">
                <td className="px-6 py-4 font-bold text-slate-900">#{customer.id}</td>
                <td className="px-6 py-4 font-medium text-slate-800">{customer.name}</td>
                <td className="px-6 py-4 text-slate-600">{customer.email}</td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center text-slate-400">
                  ไม่พบข้อมูลลูกค้าในระบบ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
