import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import { blogService } from "../services/blogService";
import "../assets/styles/Blog.css";

const defaultImage =
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=1200&h=800&fit=crop";

const getDateLabel = (isoDate) => {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await blogService.getById(id);
        setPost(data || null);
      } catch (loadError) {
        setPost(null);
        setError(loadError?.response?.data?.message || "Unable to load this story.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="blog-page">
        <div className="blog-container blog-detail-shell">
          <div className="blog-empty-state">
            <h3>Loading story...</h3>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-page">
        <div className="blog-container blog-detail-shell">
          <div className="blog-empty-state">
            <h3>Story not found</h3>
            <p>{error || "This article may have been removed."}</p>
            <Link to="/blog" className="read-more-btn blog-back-btn">
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-container blog-detail-shell">
        <article className="blog-detail-card">
          <img
            src={post.image || defaultImage}
            alt={post.title}
            className="blog-detail-image"
          />
          <div className="blog-detail-content">
            <span className="blog-category">{post.category}</span>
            <h1>{post.title}</h1>
            <div className="blog-meta">
              <div className="blog-author">
                <FaUser />
                <span>{post.author}</span>
              </div>
              <div className="blog-date">
                <FaCalendarAlt />
                <span>{getDateLabel(post.publishedAt || post.createdAt)}</span>
              </div>
              <div className="blog-read-time">
                <FaClock />
                <span>{post.readTime || "5 min read"}</span>
              </div>
            </div>
            <p className="blog-detail-text">{post.content}</p>
            <Link to="/blog" className="read-more-btn blog-back-btn">
              Back to Blog
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
