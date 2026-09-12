import { useEffect, useState, useRef } from "react";
import axios from "../api";
import { Bar, Pie } from "react-chartjs-2";
import { useNavigate, Link } from "react-router-dom";
import { PieChartIcon, BarChartIcon } from "./Icons";

// ----- Chart.js Register (Slide 13 & 22: Added ArcElement for Pie/Doughnut) -----
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Color palette for Pie slices and Bar columns (Slide 17 & 22)
const PALETTE = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#10B981",
  "#84CC16",
  "#06B6D4",
  "#F43F5E",
  "#EC4899",
  "#8B5CF6",
];

export default function ProductChart() {
  // ----- State -----
  const [chartData, setChartData] = useState();
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("pie"); // Default to Pie Chart per Slide 22
  const [statsSummary, setStatsSummary] = useState([]);
  const chartRef = useRef(null);
  const navigate = useNavigate();

  // ----- useEffect ดึงข้อมูลจาก Backend (Slide 11 & 17) -----
  useEffect(() => {
    axios
      .get("api/stats", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        const rawData = res.data;
        const labels = rawData.map((item) => item.category);
        const data = rawData.map((item) => Number(item.total));
        const totalItems = data.reduce((acc, curr) => acc + curr, 0);

        setStatsSummary(
          rawData.map((item, idx) => ({
            category: item.category,
            total: Number(item.total),
            color: PALETTE[idx % PALETTE.length],
            percentage: totalItems > 0 ? ((Number(item.total) / totalItems) * 100).toFixed(1) : 0,
          }))
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "จำนวนสินค้าตามหมวดหมู่",
              data,
              backgroundColor: PALETTE.slice(0, labels.length),
              borderColor: "#ffffff",
              borderWidth: 2,
              hoverOffset: 8,
            },
          ],
        });
      })
      .catch((err) => setError(err.message));
  }, []);

  // ----- Pie Chart Options (Slide 22) -----
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "สัดส่วนสินค้าแยกตามหมวดหมู่ (Products by Category - Pie Chart)",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        position: "bottom",
        labels: {
          padding: 16,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return ` ${label}: ${value} รายการ (${percentage}%)`;
          },
        },
      },
    },
  };

  // ----- Bar Chart Options (Slide 13) -----
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "จำนวนสินค้าแยกตามหมวดหมู่ (Products by Category - Bar Chart)",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return ` ${context.dataset.label}: ${context.parsed.y} รายการ`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // ----- Handle Click on Chart Elements (Slide 14-15) -----
  const handleChartClick = (evt) => {
    const chart = chartRef.current;
    if (!chart) return;
    const points = chart.getElementsAtEventForMode(
      evt,
      "nearest",
      { intersect: true },
      false
    );
    if (points.length) {
      const idx = points[0].index;
      const category = chart.data.labels[idx];
      navigate(`/products?category=${encodeURIComponent(category)}`);
    }
  };

  // ----- Render Loading & Error States (Slide 18) -----
  if (error) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        <p className="font-bold text-base">Error: {error}</p>
        <p className="text-xs text-red-500 mt-1">
          กรุณาตรวจสอบว่าคุณล็อกอินด้วยสิทธิ์ Admin และเซิร์ฟเวอร์เปิดอยู่
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

  if (!chartData) {
    return (
      <div className="py-24 text-center">
        <div className="inline-flex items-center gap-3 text-sm font-medium text-slate-500">
          <svg className="h-5 w-5 animate-spin text-slate-700" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          กำลังโหลดข้อมูลสถิติจากเซิร์ฟเวอร์...
        </div>
      </div>
    );
  }

  const totalProductsCount = statsSummary.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      {/* Top Header with Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800 mb-1.5">
            Admin Only
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            สถิติจำนวนและสัดส่วนสินค้า (Product Analytics)
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            แสดงการกระจายตัวของสินค้าตามหมวดหมู่ (คลิกที่ชิ้นส่วนกราฟเพื่อเปิดดูสินค้าในหมวดหมู่นั้น)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Link to Orders Monthly Chart */}
          <Link
            to="/orders-chart"
            className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/60 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition"
          >
            <BarChartIcon className="w-4 h-4 text-blue-600" />
            <span>สถิติยอดสั่งซื้อรายเดือน (Orders by Month) →</span>
          </Link>

          {/* Chart Type Toggle Tabs (Slide 22: Pie Chart / Bar Chart) */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setChartType("pie")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 transition ${
                chartType === "pie"
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <PieChartIcon className={`w-4 h-4 ${chartType === "pie" ? "text-orange-600" : "text-slate-500"}`} />
              <span>Pie Chart (สัดส่วน)</span>
            </button>
            <button
              type="button"
              onClick={() => setChartType("bar")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 transition ${
                chartType === "bar"
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <BarChartIcon className={`w-4 h-4 ${chartType === "bar" ? "text-blue-600" : "text-slate-500"}`} />
              <span>Bar Chart (แท่ง)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart Canvas Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div style={{ height: 420 }}>
          {chartType === "pie" ? (
            <Pie
              ref={chartRef}
              data={chartData}
              options={pieOptions}
              onClick={handleChartClick}
            />
          ) : (
            <Bar
              ref={chartRef}
              data={chartData}
              options={barOptions}
              onClick={handleChartClick}
            />
          )}
        </div>
      </div>

      {/* Category Breakdown Cards */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">
            สรุปข้อมูลสัดส่วนสินค้าแยกตามหมวดหมู่
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            รวมทั้งหมด {totalProductsCount} ชิ้น ({statsSummary.length} หมวดหมู่)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {statsSummary.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => navigate(`/products?category=${encodeURIComponent(item.category)}`)}
              className="flex flex-col text-left p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition group cursor-pointer"
              title={`คลิกเพื่อดูสินค้าในหมวด ${item.category}`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-bold text-slate-800 truncate group-hover:text-sky-600 transition">
                  {item.category}
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-lg font-black text-slate-900">
                  {item.total}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {item.percentage}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
