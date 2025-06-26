import React from "react";
import { useNavigate } from "react-router-dom";
import "./about.css";

const AboutUsPage = () => {
  const navigate = useNavigate();

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
    <div className="about-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-blog">Blogify</div>
        <nav className="sidebar-nav">
          <button onClick={() => handleNavigation("/dashboard")} className="nav-link">
            Home
          </button>
          <button onClick={() => handleNavigation("/explore-blogs")} className="nav-link">
            Explore Blogs
          </button>
          <button onClick={() => handleNavigation("/about")} className="nav-link active">
            About Us
          </button>
          <button onClick={handleLogout} className="nav-link">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content-about">
        <div className="about-container">
          <h1 className="page-title-about">About Us</h1>
          <p className="about-paragraph">
            Welcome to <span className="highlight">Blogify</span>, your destination for expressing ideas,
            sharing stories, and connecting with a vibrant blogging community.
          </p>

          <h2 className="about-subtitle">Our Vision</h2>
          <p className="about-paragraph">
            At Blogify, we believe everyone has a voice. Our platform enables people from all walks of life
            to share experiences, spark conversations, and build communities around shared interests.
          </p>

          <h2 className="about-subtitle">What Makes Us Unique?</h2>
          <ul className="about-list">
            <li>📝 Clean and simple blog creation experience</li>
            <li>🌐 Categorized content discovery like Travel, Food, Business, and more</li>
            <li>🔐 Secure login and easy-to-use dashboard</li>
            <li>💡 Personalized blogging styles and themes</li>
            <li>👥 Interactive, supportive user community</li>
          </ul>

          <h2 className="about-subtitle">Meet the Team</h2>
          <p className="about-paragraph">
            Blogify was built with passion by a team of developers, designers, and writers who understand
            the power of words. We're constantly evolving the platform with new features based on your feedback.
          </p>

          <p className="about-footer">
            &copy; {new Date().getFullYear()} Blogify. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AboutUsPage;
