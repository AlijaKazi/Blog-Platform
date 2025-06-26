import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const DashboardPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [blogType, setBlogType] = useState("blog-type");
  const [editBlogId, setEditBlogId] = useState(null);
  const [showBlogs, setShowBlogs] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!userEmail) return;
    axios
      .get(`http://localhost:5000/api/blogs/${userEmail}`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, [userEmail]);

  const handleNavigation = (path) => navigate(path);

  const resetForm = () => {
    setEditBlogId(null);
    setNewTitle("");
    setNewContent("");
    setBlogType("blog-type");
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const blogData = { userEmail, title: newTitle, content: newContent, type: blogType };
    const request = editBlogId
      ? axios.put(`http://localhost:5000/api/blogs/${editBlogId}`, blogData)
      : axios.post("http://localhost:5000/api/blogs", blogData);

    try {
      const res = await request;
      if (editBlogId) {
        setBlogs((prev) => prev.map((b) => (b._id === editBlogId ? res.data : b)));
      } else {
        setBlogs([res.data, ...blogs]);
      }
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error("Error submitting blog:", err);
    }
  };

  const handleEdit = (blog, e) => {
    e.stopPropagation();
    setEditBlogId(blog._id);
    setNewTitle(blog.title);
    setNewContent(blog.content);
    setBlogType(blog.type || "Personal");
    setShowForm(true);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("username");
      navigate("/home");
    }
  };

  if (!userEmail) return <p>Please login first to see your dashboard.</p>;

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo-blog">Blogify</div>
        <nav className="sidebar-nav">
          <button className="nav-link active" onClick={() => handleNavigation("/dashboard")}>Home</button>
          <button className="nav-link" onClick={() => handleNavigation("/explore-blogs")}>Explore Blogs</button>
          <button className="nav-link" onClick={() => handleNavigation("/about")}>About Us</button>
          <button className="nav-link" onClick={handleLogout}>Logout</button>
        </nav>
      </aside>

      <main className="main-content">
        <div className="user-info-badge">
          <div className="user-icon">
            {username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="user-details-hover">
            <p><strong>{username}</strong></p>
            <p style={{ fontSize: "0.85rem", opacity: 0.9 }}>{userEmail}</p>
          </div>
        </div>

        <h1 className="dashboard-heading">Welcome{username ? `, ${username}` : ""}! 📝</h1>

        <section className="dashboard-info">
          <p>Ready to share something new?</p>
          <button onClick={() => setShowForm(!showForm)} className="write-blog-button">
            {showForm ? "Cancel" : "Write a Blog"}
          </button>
        </section>

        {showForm && (
          <form onSubmit={handleBlogSubmit} className="blog-form">
            <h2>{editBlogId ? "Edit Blog" : "Write a New Blog"}</h2>
            <select value={blogType} onChange={(e) => setBlogType(e.target.value)} required>
              <option value="blog-type" disabled>Blog Type</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Business">Business</option>
              <option value="Personal">Personal</option>
              <option value="News">News</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
            <input
              type="text"
              placeholder="Blog Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Write your blog..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="submit-button">
              {editBlogId ? "Update Blog" : "Publish"}
            </button>
          </form>
        )}

        <button onClick={() => setShowBlogs(!showBlogs)} className="toggle-button">
          {showBlogs ? "Hide Your Blogs" : "Show Your Blogs"}
        </button>

        {showBlogs && blogs.length > 0 && (
          <>
            <p className="blog-count">You have published {blogs.length} blog{blogs.length > 1 ? "s" : ""}.</p>
            <div className="blog-list">
              {blogs.slice(0, 5).map((blog) => (
                <div key={blog._id} className="blog-card" onClick={() => window.open(`/blog/${blog._id}`, "_blank")}>
                  <div className="blog-header">
                    <h3>{blog.title}</h3>
                    <small>{new Date(blog.createdAt).toLocaleString()}</small>
                  </div>
                  <div className="blog-actions">
                    <button className="edit-button" onClick={(e) => handleEdit(blog, e)}>Edit</button>
                    <button className="delete-button" onClick={(e) => handleDelete(blog._id, e)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
