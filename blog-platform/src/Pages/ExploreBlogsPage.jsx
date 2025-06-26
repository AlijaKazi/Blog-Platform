import React from "react";
import { useNavigate } from "react-router-dom";
import TravelImg from "../assets/categories/Travel.jpg";
import FoodImg from "../assets/categories/Food.jpg";
import BusinessImg from "../assets/categories/Business.jpg";
import PersonalImg from "../assets/categories/Personal.jpg";
import NewsImg from "../assets/categories/News.jpg";
import LifestyleImg from "../assets/categories/Lifestyle.jpg";
import "./ExploreBlogsPage.css";

const ExploreBlogsPage = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Travel", path: "/blogs/travel", image: TravelImg },
    { name: "Food", path: "/blogs/food", image: FoodImg },
    { name: "Business", path: "/blogs/business", image: BusinessImg },
    { name: "Personal", path: "/blogs/personal", image: PersonalImg },
    { name: "News", path: "/blogs/news", image: NewsImg },
    { name: "Lifestyle", path: "/blogs/lifestyle", image: LifestyleImg },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("username"); 
      navigate("/home");
    }
  };

  return (
    <div className="explore-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-blog">Blogify</div>
        <nav className="sidebar-nav">
          <button onClick={() => handleNavigation("/dashboard")} className="nav-link">
            Home
          </button>
          <button onClick={() => handleNavigation("/explore-blogs")} className="nav-link active">
            Explore Blogs
          </button>
          <button onClick={() => handleNavigation("/about")} className="nav-link">
            About Us
          </button>
          <button onClick={handleLogout} className="nav-link">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content-explore">
        <h1 className="page-title-explore">Explore Blogs</h1>
        <div className="category-grid">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card"
              onClick={() => navigate(category.path)}
            >
              <img src={category.image} alt={category.name} className="category-image" />
              <div className="category-name">{category.name} →</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExploreBlogsPage;
