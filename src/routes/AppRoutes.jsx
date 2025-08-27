import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Pages
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import TVShows from "../pages/TVShows";
import MovieDetails from "../pages/MovieDetails";
import ActorDetails from "../pages/ActorDetails";
import SearchResults from "../pages/SearchResults";
import Categories from "../pages/Categories";
import Favorites from "../pages/Favorites";
import WatchLater from "../pages/WatchLater";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import TVShowDetails from "../pages/TVShowDetails"; // ✅ correct import/casing

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes with Navbar + Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/tv/:id" element={<TVShowDetails />} /> {/* ✅ details */}
        <Route path="/actors/:id" element={<ActorDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* 404 fallback */}
      <Route
        path="*"
        element={
          <h1 className="text-center text-3xl mt-10">404 - Page Not Found</h1>
        }
      />
    </Routes>
  );
}
