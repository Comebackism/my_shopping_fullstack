import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import ProductCreate from './components/ProductCreate';
import Login from './components/Login';
import Register from './components/Register';
import Orders from './components/Orders';
import CustomerList from './components/CustomerList';
import AdminPage from './components/AdminPage';
import ProductChart from './components/ProductChart';
import OrdersMonthlyChart from './components/OrdersMonthlyChart';
import WorawatLogo from './components/WorawatLogo';
import { UserIcon } from './components/Icons';

// ฟังก์ชัน decode JWT payload (ไม่ต้องใช้ library เพิ่ม)
function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const decoded = decodeToken(token);
  const isAdmin = decoded && decoded.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-slate-50/50">
        {/* Sticky Architectural Navbar */}
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link to="/" className="transition hover:opacity-90">
              <WorawatLogo size="md" />
            </Link>

            <nav className="flex flex-wrap items-center gap-1 text-xs font-semibold sm:text-sm">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                Contact
              </NavLink>
              {isAdmin && (
                <>
                  <NavLink
                    to="/chart"
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-1.5 transition ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    Product Stats
                  </NavLink>
                  <NavLink
                    to="/orders-chart"
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-1.5 transition ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    Order Stats
                  </NavLink>
                  <NavLink
                    to="/customers"
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-1.5 transition ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    Customers
                  </NavLink>
                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-1.5 transition ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-1.5 transition border ${
                        isActive
                          ? "bg-purple-700 text-white border-purple-700"
                          : "border-purple-200 text-purple-700 bg-purple-50/50 hover:bg-purple-100"
                      }`
                    }
                  >
                    Admin
                  </NavLink>
                </>
              )}

              {token ? (
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-200">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold border ${
                      isAdmin
                        ? "bg-purple-100 text-purple-800 border-purple-200"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>{decoded?.username || "user"} ({decoded?.role || "user"})</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-rose-600 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1 ml-2 pl-2 border-l border-slate-200">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-1.5 transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-1.5 transition ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "bg-slate-900 text-white hover:bg-blue-600"
                      }`
                    }
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </nav>
          </div>
        </header>

        {/* Main Content Viewport */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/customers" element={isAdmin ? <CustomerList /> : <Navigate to={token ? "/products" : "/login"} replace />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={isAdmin ? <ProductCreate /> : <Navigate to="/login" replace />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/admin/*" element={isAdmin ? <AdminPage /> : <Navigate to={token ? "/products" : "/login"} replace />} />
            <Route path="/orders" element={isAdmin ? <Orders /> : <Navigate to={token ? "/products" : "/login"} replace />} />
            <Route path="/chart" element={isAdmin ? <ProductChart /> : <Navigate to={token ? "/products" : "/login"} replace />} />
            <Route path="/orders-chart" element={isAdmin ? <OrdersMonthlyChart /> : <Navigate to={token ? "/products" : "/login"} replace />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        {/* Cohesive Brand Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
            <div className="flex items-center gap-3">
              <WorawatLogo size="sm" />
              <span className="text-slate-300">|</span>
              <span className="font-medium text-slate-500">Elevate Your Street Identity</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/products" className="hover:text-slate-900 transition">สินค้า</Link>
              <Link to="/about" className="hover:text-slate-900 transition">เกี่ยวกับเรา</Link>
              <Link to="/contact" className="hover:text-slate-900 transition">ติดต่อเรา</Link>
            </div>
            <p className="text-slate-400">
              © 2026 WORAWAT STUDIO. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
