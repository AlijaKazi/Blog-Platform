import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CategoryBlogsPage.css";

const CategoryBlogsPage = () => {
  const { type } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/type/${type}`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching category blogs:", err);
        setError("HTTPConnectionPool(host='localhost', port=5000): Max retries exceeded with url: /api/blogs/type/${type}`) (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x7f8b004cf710>: Failed to establish a new connection: [Errno 111] Connection refused')");
      });
  }, [type]);

  const openBlogInNewTab = (id) => {
    window.open(`/blog/${id}`, "_blank");
  };

  return (
    <div className="category-blogs-container">
      <div className="heading-container">
        <h1>{type.charAt(0).toUpperCase() + type.slice(1)} Blogs</h1>
      </div>
      {error ? (
        <p>{error}</p>
      ) : blogs.length === 0 ? (
        <p>No {type} blogs found.</p>
      ) : (
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="category-blog-card"
              onClick={() => openBlogInNewTab(blog._id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") openBlogInNewTab(blog._id);
              }}
            >
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-author">Posted by: {blog.author}</p> {/* Display the author's name */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBlogsPage;
