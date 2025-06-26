import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogPage.css";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/detail/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch blog: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message);
      }
    };
    fetchBlog();
  }, [id]);

  if (error) {
    return (
      <div className="center-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="center-screen text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="blog-page-wrapper">
      <div className="blog-container">
        <h1 className="blogtitle">{blog.title}</h1>

        <div className="blog-meta">
          <p><strong>Type:</strong> {blog.type}</p>
          <p>
            <strong>Published on:</strong>{" "}
            {new Date(blog.createdAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="blog-content">
          <p className="blog-para">{blog.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
