import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertTriangleIcon } from './Icons';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      
      const result = await response.json();
      if (result.success) {
        const role = result.role || result.user?.role || 'user';
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", role);
        setToken(result.token);

        // Slide 19: Redirect ตามสิทธิ์
        if (role === 'admin') {
          navigate("/admin/products");
        } else {
          navigate("/products");
        }
      } else {
        setError(result.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          เข้าสู่ระบบ (Login)
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          กรอก Username และ Password เพื่อเข้าใช้งาน
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 flex items-center gap-2">
          <AlertTriangleIcon className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
            Username
          </label>
          <input 
            type="text" 
            placeholder="Username (เช่น admin หรือ alice)" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" 
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
            Password
          </label>
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100" 
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
        >
          {loading ? "กำลังเข้าสู่ระบบ..." : "Login"}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500">
        ยังไม่มีบัญชีผู้ใช้?{" "}
        <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 underline">
          สมัครสมาชิกใหม่ (Register)
        </Link>
      </div>
    </div>
  );
}
