import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { CheckCircleIcon, AlertTriangleIcon } from "./Icons";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // 2. บังคับกรอกทั้ง 3 ช่อง
    if (!username.trim() || !password.trim() || !fullname.trim()) {
      setError("กรุณากรอก Username, Password และ Fullname ให้ครบถ้วน");
      return;
    }

    setLoading(true);

    try {
      // 3. ส่งข้อมูลด้วย axios POST ไปยัง API /api/users/register
      // 4. role เป็น "user" อัตโนมัติทางฝั่ง Backend
      const res = await api.post("/api/users/register", {
        username: username.trim(),
        password: password,
        fullname: fullname.trim()
      });

      if (res.data && res.data.success) {
        // 5. ถ้าสำเร็จ -> แสดงข้อความ “Register success” และเคลียร์ค่าในฟอร์ม
        setMessage("Register success");
        setUsername("");
        setPassword("");
        setFullname("");
      }
    } catch (err) {
      // 6. ถ้า error -> แสดงข้อความ error (เช่น Username ซ้ำ, Password ว่าง)
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "เกิดข้อผิดพลาดในการสมัครสมาชิก";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          สมัครสมาชิก (Register)
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          สร้างบัญชีผู้ใช้ใหม่สำหรับเข้าสู่ระบบ
        </p>
      </div>

      {/* ข้อความแจ้งเตือนเมื่อสำเร็จ */}
      {message && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
          <Link
            to="/login"
            className="font-semibold text-emerald-700 underline hover:text-emerald-900 text-xs"
          >
            เข้าสู่ระบบทันที &rarr;
          </Link>
        </div>
      )}

      {/* ข้อความแจ้งเตือนเมื่อ Error */}
      {error && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 flex items-center gap-2">
          <AlertTriangleIcon className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Username */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
            Username <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="ตั้งชื่อผู้ใช้ เช่น somchai"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
            Password <span className="text-rose-500">*</span>
          </label>
          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        {/* Fullname */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
            Fullname <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="ชื่อ - นามสกุลจริง"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "กำลังบันทึกข้อมูล..." : "Register"}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500">
        มีบัญชีอยู่แล้ว?{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:text-blue-700 underline"
        >
          เข้าสู่ระบบ (Login)
        </Link>
      </div>
    </div>
  );
}
