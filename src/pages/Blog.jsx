import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaUser, FaHeart, FaComments } from "react-icons/fa";
import "../style/Blog.css";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Heartwarming Story of Max's Adoption",
      excerpt: "When Sarah first met Max at our shelter, she knew he was the one. This Golden Retriever had been waiting for his forever home for months...",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Adoption Stories",
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=300&fit=crop",
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      title: "Essential Tips for New Pet Parents",
      excerpt: "Bringing a new pet into your home is an exciting experience, but it also comes with responsibilities. Here are our top tips for new pet parents...",
      author: "Dr. Emily Thompson",
      date: "March 12, 2024",
      category: "Pet Care",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop",
      likes: 67,
      comments: 23
    },
    {
      id: 3,
      title: "Volunteer Spotlight: Meet Our Amazing Team",
      excerpt: "Our volunteers are the backbone of our shelter. This month, we're highlighting some of the incredible people who dedicate their time to helping animals...",
      author: "Michael Chen",
      date: "March 10, 2024",
      category: "Volunteer Stories",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      likes: 34,
      comments: 8
    },
    {
      id: 4,
      title: "Understanding Pet Nutrition: A Complete Guide",
      excerpt: "Proper nutrition is crucial for your pet's health and well-being. Learn about the different dietary needs of dogs and cats at various life stages...",
      author: "Dr. Lisa Anderson",
      date: "March 8, 2024",
      category: "Pet Care",
      image: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=400&h=300&fit=crop",
      likes: 89,
      comments: 31
    },
    {
      id: 5,
      title: "How to Prepare Your Home for a New Pet",
      excerpt: "Before bringing a new pet home, it's important to prepare your living space. Here's a comprehensive checklist to ensure your home is pet-ready...",
      author: "Jennifer Davis",
      date: "March 5, 2024",
      category: "Pet Care",
      image: "https://images.unsplash.com/photo-1575859431774-2e57ed632664?w=400&h=300&fit=crop",
      likes: 56,
      comments: 19
    },
    {
      id: 6,
      title: "Success Story: Luna Finds Her Perfect Match",
      excerpt: "Luna, a shy Husky who had been with us for over a year, finally found her perfect family. Read about her incredible transformation...",
      author: "David Rodriguez",
      date: "March 3, 2024",
      category: "Adoption Stories",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
      likes: 78,
      comments: 15
    }
  ];

  return (
    <div className="blog-page">
      <div className="back-button">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      <div className="blog-container">
        <div className="blog-header">
          <h1>Our Blog</h1>
          <p>Stay updated with the latest news, adoption stories, and pet care tips from our shelter community.</p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
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
                </div>
                <Link to={`/blog/${post.id}`} className="read-more-btn">Read More</Link>
              </div>
            </article>
          ))}
        </div>

        <div className="blog-newsletter">
          <h2>Stay Connected</h2>
          <p>Subscribe to our newsletter for the latest updates, adoption stories, and pet care tips.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;