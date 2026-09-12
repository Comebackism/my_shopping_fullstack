import React, { useEffect, useState } from "react";
import axios from "../api";
import { Line, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { BarChartIcon } from "./Icons";

// Chart.js registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const THAI_MONTHS = [
  { key: "01", name: "ม.ค." },
  { key: "02", name: "ก.พ." },
  { key: "03", name: "มี.ค." },
  { key: "04", name: "เม.ย." },
  { key: "05", name: "พ.ค." },
  { key: "06", name: "มิ.ย." },
  { key: "07", name: "ก.ค." },
  { key: "08", name: "ส.ค." },
  { key: "09", name: "ก.ย." },
  { key: "10", name: "ต.ค." },
  { key: "11", name: "พ.ย." },
  { key: "12", name: "ธ.ค." },
];

export default function OrdersMonthlyChart() {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("line"); // 'line' or 'bar'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/orders/stats/monthly", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const rawData = res.data; // [{ month: "2026-01", total: "2" }, ...]

        // Create month lookup table
        const monthMap = {};
        let totalCount = 0;
        rawData.forEach((item) => {
          // item.month is formatted "YYYY-MM"
          const m = item.month ? item.month.split("-")[1] : "";
          if (m) {
            monthMap[m] = Number(item.total);
            totalCount += Number(item.total);
          }
        });

        setTotalOrders(totalCount);

        // Map to 12 months (ม.ค. - ธ.ค.), default 0 if no order (Slide 24)
        const labels = THAI_MONTHS.map((m) => m.name);
        const data = THAI_MONTHS.map((m) => monthMap[m.key] || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "จำนวนคำสั่งซื้อ (Orders)",
              data,
              borderColor: "#3B82F6",
              backgroundColor: "rgba(59, 130, 246, 0.15)",
              borderWidth: 3,
              pointBackgroundColor: "#1D4ED8",
              pointBorderColor: "#FFFFFF",
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: true,
              tension: 0.35, // Smooth curve
            },
          ],
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} รายการ`,
        },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  const lineOptions = {
    ...barOptions,
    interaction: { mode: "index", intersect: false },
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-flex items-center gap-3 text-sm font-medium text-slate-500">
          <svg className="h-5 w-5 animate-spin text-slate-700" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          กำลังโหลดข้อมูลสถิติคำสั่งซื้อรายเดือน...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        <p className="font-bold text-base">Error: {error}</p>
        <p className="text-xs text-red-500 mt-1">
          กรุณาเข้าสู่ระบบด้วยบัญชีผู้ดูแลระบบ (Admin) เพื่อดูสถิติ
        </p>
        <Link
          to="/login"
          className="mt-4 inline-block rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
        >
          เข้าสู่ระบบใหม่
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 mb-1.5">
            Workshop • Slide 24
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            สถิติคำสั่งซื้อแยกรายเดือน (Orders by Month)
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            แสดงจำนวน Order แยกรายเดือน ม.ค.–ธ.ค. (เดือนที่ไม่มี Order แสดงเป็น 0)
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setChartType("line")}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition ${
                chartType === "line"
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Line Chart</span>
            </button>
            <button
              type="button"
              onClick={() => setChartType("bar")}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition ${
                chartType === "bar"
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <BarChartIcon className="w-4 h-4 text-slate-700" />
              <span>Bar Chart</span>
            </button>
          </div>

          <Link
            to="/chart"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
          >
            &larr; กลับหน้าสถิติสินค้า
          </Link>
        </div>
      </div>

      {/* Main Chart Canvas */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div style={{ height: 400 }}>
          {chartData && (
            chartType === "line" ? (
              <Line data={chartData} options={lineOptions} />
            ) : (
              <Bar data={chartData} options={barOptions} />
            )
          )}
        </div>
      </div>
      
      {/* 12 Months Summary Badges */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4">
          สรุปยอดรวมคำสั่งซื้อตลอดทั้งปี: <span className="text-blue-600">{totalOrders}</span> รายการ
        </h3>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {chartData && chartData.labels.map((monthName, idx) => {
            const count = chartData.datasets[0].data[idx];
            return (
              <div 
                key={monthName}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border ${
                  count > 0 
                    ? 'border-blue-200 bg-blue-50/50' 
                    : 'border-slate-100 bg-slate-50/50'
                }`}
              >
                <span className="text-xs font-semibold text-slate-500">{monthName}</span>
                <span className={`text-lg font-black mt-1 ${count > 0 ? 'text-blue-700' : 'text-slate-400'}`}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
