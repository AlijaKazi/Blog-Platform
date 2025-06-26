import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="base-layout">
      {/* Header */}
      <header className="header simple-header">
        <div className="logo">Blogify</div>
        <button onClick={() => handleNavigation("/login")} className="nav-link-login-btn">
          Login
        </button>
      </header>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="bg-slide bg1"></div>
        <div className="bg-slide bg2"></div>
        <div className="bg-slide bg3"></div>
        <div className="bg-slide bg4"></div>
        <div className="bg-slide bg5"></div>

        <div className="hero-content">
          <h1 className="hero-title">Discover new ideas, share your unique story.</h1>
          <p className="hero-description">
            Expand your mind, express your creativity, and find your tribe — a supportive network of like-minded individuals ready to engage with your unique voice and shared passions.
          </p>
          <div className="button-container">
            <button onClick={() => handleNavigation("/signup")} className="primary-btn hero-btn">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="landing-page-container">
        <div className="features-section">
          <h2>Unlock the Power of Blogging</h2>
          <div className="features-container">
            {[
              { icon: "✍️", title: "Create & Publish", desc: "Craft compelling stories and share your expertise with an intuitive writing interface." },
              { icon: "📖", title: "Discover Diverse Content", desc: "Explore a wide range of topics, from technology and travel to lifestyle and personal growth." },
              { icon: "💬", title: "Engage & Connect", desc: "Participate in meaningful discussions and connect with fellow enthusiasts." },
              { icon: "⭐", title: "Personalized Feed", desc: "Stay updated with the blogs and writers that matter most to you." },
              { icon: "🔍", title: "Powerful Search", desc: "Find the blogs you're looking for with advanced search functionality." },
              { icon: "📊", title: "Track Your Impact", desc: "Monitor your blog's performance and audience engagement." }
            ].map((feature, idx) => (
              <div className="feature-item" key={idx}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="call-to-action-section">
          <h2>Ready to Share Your Story?</h2>
          <p>Create your account today and start your blogging journey!</p>
          <button onClick={() => handleNavigation("/signup")} className="primary-btn cta-btn">
            Sign Up Now
          </button>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Blogify. All rights reserved.</p>
          <nav className="footer-nav">
            <button onClick={() => handleNavigation("/privacy")} className="footer-link">Privacy Policy</button>
            <button onClick={() => handleNavigation("/terms")} className="footer-link">Terms of Service</button>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
