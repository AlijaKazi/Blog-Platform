import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import BlogPage from "./Pages/BlogPage";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/dashboard";
import SignupPage from "./Pages/SignupPage";
import ExploreBlogsPage from "./Pages/ExploreBlogsPage";
import CategoryBlogsPage from "./Pages/CategoryBlogsPage";
import AboutUs from "./Pages/AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/explore-blogs" element={<ExploreBlogsPage />} />
        <Route path="/blogs/:type" element={<CategoryBlogsPage />} />
        <Route path="/login" element={<LoginPage />} />     
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
