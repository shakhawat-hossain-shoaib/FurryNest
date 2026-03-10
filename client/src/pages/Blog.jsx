import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUser,
  FaHeart,
  FaComments,
  FaSearch,
  FaClock,
} from "react-icons/fa";
import { blogService } from "../services/blogService";
import { useAuth } from "../context/useAuth";
import "../assets/styles/Blog.css";

const defaultImage =
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=1200&h=800&fit=crop";

function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={subscribed}
        required
      />
      <button
        type="submit"
        className={`subscribe-btn${subscribed ? " subscribed" : ""}`}
        disabled={subscribed}
      >
        {subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </form>
  );
}

const getDateLabel = (isoDate) => {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const createEmptyBlogForm = () => ({
  title: "",
  excerpt: "",
  content: "",
  author: "",
  category: "Pet Care",
  image: "",
  readTime: "5 min read",
  likes: 0,
  comments: 0,
});

const Blog = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formMode, setFormMode] = useState("create");
  const [editingId, setEditingId] = useState("");
  const [blogForm, setBlogForm] = useState(createEmptyBlogForm());
  const [formError, setFormError] = useState("");
  const [formBusy, setFormBusy] = useState(false);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await blogService.list();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load blogs", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const normalizedPosts = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      id: post._id,
      image: post.image || defaultImage,
      date: getDateLabel(post.publishedAt || post.createdAt),
      likes: Number(post.likes || 0),
      comments: Number(post.comments || 0),
      readTime: post.readTime || "5 min read",
    }));
  }, [posts]);

  const categories = useMemo(() => {
    const unique = [...new Set(normalizedPosts.map((post) => post.category))];
    return ["All", ...unique];
  }, [normalizedPosts]);

  const filteredPosts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return normalizedPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        !normalized ||
        post.title.toLowerCase().includes(normalized) ||
        post.excerpt.toLowerCase().includes(normalized) ||
        post.author.toLowerCase().includes(normalized);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm, normalizedPosts]);

  const featuredPost = filteredPosts[0] || null;
  const regularPosts = featuredPost ? filteredPosts.slice(1) : [];

  const onFormChange = (field, value) => {
    setBlogForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setBlogForm(createEmptyBlogForm());
    setFormMode("create");
    setEditingId("");
    setFormError("");
  };

  const startEdit = (post) => {
    setFormMode("edit");
    setEditingId(post._id);
    setFormError("");
    setBlogForm({
      title: post.title || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      author: post.author || "",
      category: post.category || "Pet Care",
      image: post.image || "",
      readTime: post.readTime || "5 min read",
      likes: Number(post.likes || 0),
      comments: Number(post.comments || 0),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateForm = () => {
    if (!blogForm.title.trim()) return "Title is required";
    if (!blogForm.excerpt.trim()) return "Excerpt is required";
    if (!blogForm.content.trim()) return "Content is required";
    if (!blogForm.author.trim()) return "Author is required";
    if (!blogForm.category.trim()) return "Category is required";
    return "";
  };

  const saveBlog = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormBusy(true);
    setFormError("");

    const payload = {
      ...blogForm,
      likes: Number(blogForm.likes || 0),
      comments: Number(blogForm.comments || 0),
    };

    try {
      if (formMode === "edit" && editingId) {
        await blogService.update(editingId, payload);
      } else {
        await blogService.create(payload);
      }

      resetForm();
      await loadBlogs();
    } catch (error) {
      setFormError(error.message || "Failed to save blog post");
    } finally {
      setFormBusy(false);
    }
  };

  const removeBlog = async (postId) => {
    const ok = window.confirm("Delete this blog post?");
    if (!ok) return;

    try {
      await blogService.remove(postId);
      await loadBlogs();
    } catch (error) {
      alert(error.message || "Failed to delete blog post");
    }
  };

  return (
    <div className="blog-page">
      <div className="blog-container">
        <div className="blog-header">
          <h1>FurryNest Journal</h1>
          <p>
            Stories, care tips, and shelter updates to help every animal find a
            safer and happier life.
          </p>
        </div>

        {isAdmin && (
          <section className="blog-admin-panel">
            <h2>{formMode === "edit" ? "Edit Blog Post" : "Create Blog Post"}</h2>
            <form className="blog-admin-form" onSubmit={saveBlog}>
              <input
                type="text"
                placeholder="Title"
                value={blogForm.title}
                onChange={(e) => onFormChange("title", e.target.value)}
              />
              <input
                type="text"
                placeholder="Author"
                value={blogForm.author}
                onChange={(e) => onFormChange("author", e.target.value)}
              />
              <input
                type="text"
                placeholder="Category"
                value={blogForm.category}
                onChange={(e) => onFormChange("category", e.target.value)}
              />
              <input
                type="text"
                placeholder="Read time (e.g. 5 min read)"
                value={blogForm.readTime}
                onChange={(e) => onFormChange("readTime", e.target.value)}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={blogForm.image}
                onChange={(e) => onFormChange("image", e.target.value)}
              />
              <input
                type="number"
                min="0"
                placeholder="Likes"
                value={blogForm.likes}
                onChange={(e) => onFormChange("likes", e.target.value)}
              />
              <input
                type="number"
                min="0"
                placeholder="Comments"
                value={blogForm.comments}
                onChange={(e) => onFormChange("comments", e.target.value)}
              />
              <textarea
                placeholder="Excerpt"
                value={blogForm.excerpt}
                onChange={(e) => onFormChange("excerpt", e.target.value)}
              />
              <textarea
                placeholder="Content"
                value={blogForm.content}
                onChange={(e) => onFormChange("content", e.target.value)}
                className="blog-admin-content"
              />
              {formError && <p className="blog-admin-error">{formError}</p>}
              <div className="blog-admin-actions">
                <button type="submit" disabled={formBusy} className="blog-admin-save">
                  {formBusy ? "Saving..." : formMode === "edit" ? "Update Post" : "Create Post"}
                </button>
                {formMode === "edit" && (
                  <button type="button" onClick={resetForm} className="blog-admin-cancel">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>
        )}

        <div className="blog-toolbar">
          <div className="blog-search">
            <FaSearch className="blog-search-icon" />
            <input
              type="text"
              placeholder="Search stories, authors, or topics"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="blog-categories" role="tablist" aria-label="Blog categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`blog-category-chip${
                  activeCategory === category ? " active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="blog-empty-state">
            <h3>Loading posts...</h3>
          </div>
        ) : featuredPost ? (
          <article className="featured-post-card">
            <div className="featured-post-image">
              <img src={featuredPost.image} alt={featuredPost.title} />
            </div>
            <div className="featured-post-content">
              <span className="blog-category featured">{featuredPost.category}</span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="blog-meta">
                <div className="blog-author">
                  <FaUser />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="blog-date">
                  <FaCalendarAlt />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="blog-read-time">
                  <FaClock />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              <button
                type="button"
                className="read-more-btn"
                onClick={() => navigate(`/blog/${featuredPost.id}`)}
              >
                Read Full Story
              </button>
            </div>
          </article>
        ) : (
          <div className="blog-empty-state">
            <h3>No articles found</h3>
            <p>Try a different keyword or category to find relevant content.</p>
          </div>
        )}

        {regularPosts.length > 0 && (
          <div className="blog-grid">
            {regularPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                  <div className="blog-category">{post.category}</div>
                </div>
                <div className="blog-content">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-meta">
                    <div className="blog-author">
                      <FaUser />
                      <span>{post.author}</span>
                    </div>
                    <div className="blog-date">
                      <FaCalendarAlt />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="blog-stats">
                    <div className="blog-likes">
                      <FaHeart />
                      <span>{post.likes}</span>
                    </div>
                    <div className="blog-comments">
                      <FaComments />
                      <span>{post.comments}</span>
                    </div>
                    <div className="blog-read-time">
                      <FaClock />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="read-more-btn"
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    Read More
                  </button>

                  {isAdmin && (
                    <div className="blog-card-admin-actions">
                      <button type="button" className="blog-admin-edit" onClick={() => startEdit(post)}>
                        Edit
                      </button>
                      <button type="button" className="blog-admin-delete" onClick={() => removeBlog(post._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="blog-newsletter">
          <h2>Stay Connected</h2>
          <p>
            Subscribe for rescue updates, practical pet-care guides, and new
            adoption stories each week.
          </p>
          <NewsletterSubscribe />
        </div>
      </div>
    </div>
  );
};

export default Blog;
