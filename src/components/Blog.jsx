import React from "react";

const posts = [
  {
    title: "Starting your new friendship off on the right paw",
    date: "08.10.2025",
    tag: "Adopting a pet",
    img: "https://images.unsplash.com/photo-1518715308788-30057527ade5"
  },
  {
    title: "All the things to consider when choosing child friendly pets",
    date: "08.12.2025",
    tag: "Adopting a pet",
    img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2"
  },
  {
    title: "12 Reasons to adopt, don't shop!",
    date: "08.13.2025",
    tag: "Adopting a pet",
    img: "https://images.unsplash.com/photo-1507149833265-60c372daea22"
  }
];

const Blog = () => (
  <section className="blog">
    <h2>Latest blog posts</h2>
    <div className="blog-grid">
      {posts.map((post, i) => (
        <div key={i} className="blog-card">
          <img
            src={post.img + "?w=400&h=300&fit=cover"}
            alt={post.title}
          />
          <div className="blog-info">
            <span className="blog-tag">{post.tag}</span>
            <h3>{post.title}</h3>
            <span className="blog-date">{post.date}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Blog;
