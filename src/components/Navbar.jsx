import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm md:text-base font-medium transition-colors duration-300 ${
      isActive
        ? "bg-red-600 text-white"
        : "text-gray-200 hover:bg-red-500 hover:text-white"
    }`;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-800"
      } ${scrolled ? "shadow-2xl backdrop-blur-md py-2" : "py-4"}`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl md:text-3xl font-extrabold text-red-500 tracking-wide transition-transform duration-300 ${
            scrolled ? "scale-95" : "scale-100"
          }`}
        >
          ABF Movies
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/movies" className={linkClass}>
            Movies
          </NavLink>
          <NavLink to="/tv" className={linkClass}>
            TV Shows
          </NavLink>
          <NavLink to="/categories" className={linkClass}>
            Categories
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            Favorites
          </NavLink>
          {user ? (
            <>
              <span className="text-sm md:text-base text-gray-300">
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 text-white font-medium transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors duration-300"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl p-2 focus:outline-none"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-md p-4 space-y-3">
          <NavLink
            to="/"
            className={linkClass}
            end
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Movies
          </NavLink>
          <NavLink
            to="/tv"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            TV Shows
          </NavLink>

          <NavLink
            to="/categories"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Categories
          </NavLink>
          <NavLink
            to="/favorites"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Favorites
          </NavLink>

          {user ? (
            <>
              <span className="text-gray-200 block">Hi, {user.name}</span>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 text-white font-medium w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="mt-2 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium w-full"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      )}
    </nav>
  );
}
