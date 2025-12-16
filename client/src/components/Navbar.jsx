import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuthStore();
  const handleLogout = () => {
    logOut();
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-150 px-4">
      <div
        className="backdrop-blur-xl bg-white/20 shadow-lg border border-white/30 
                   rounded-full px-6 py-2 flex items-center justify-between"
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-slate-900 font-semibold text-lg tracking-wide"
        >
          Task Manager
        </Link>

        <div className="hidden md:flex items-center gap-6 text-slate-900 text-sm font-medium">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="hover:text-slate-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-slate-600 transition">
                Login
              </Link>
              <Link
                to={"/register"}
                className="hover:text-slate-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-slate-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="md:hidden mt-2 backdrop-blur-xl bg-white/20 border border-white/30 
                     rounded-xl p-4 text-slate-900 text-sm font-medium shadow-lg animate-fadeSlide"
        >
          <div className="flex flex-col gap-4">
            {user ? (
              <>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-slate-600 transition"
                >
                  Create Todo
                </Link>

                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-slate-600 transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left hover:text-slate-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="hover:text-slate-600 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
