import React from "react";
import { useNavigate } from "react-router-dom";
const TravelImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWKePeRSQaWeOcpSEjA15lQZ_ACsPWjLlWi2F6uUMsQ&s=10";
const FoodImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVJNTpMZ8SyX5chUSzZsaq79bicemVuYKn2sTV39ZGPw&s=10";
const PersonalImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw9pHl7fkXTOzFq02BRz8KoUEtMTxIokQ9V7P96GxeVQ&s";
const BusinessImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6csP4_HAXyN2GqdmY_vGBzT-KQtcJ-594EtQY1N7e5Q&s=10";
const NewsImg = "https://i.cbc.ca/ais/1.4428580,1686928374000/full/max/0/default.jpg?im=Crop%2Crect%3D%280%2C0%2C5000%2C2812%29%3B";
const LifestyleImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNEAeIJEel0MLoR_aUvc9dwKPzSFNe4MmjGHDqtWTSag&s=10";
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
