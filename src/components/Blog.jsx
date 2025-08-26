import React, { useState } from "react";

const posts = [
  {
    title: "Starting your new friendship off on the right paw",
    date: "08.10.2025",
    tag: "Adopting a pet",
    img: "https://images.unsplash.com/photo-1600469801983-3d0b47a2059a"
  },
  {
    title: "All the things to consider when choosing child friendly pets",
    date: "08.12.2025",
    tag: "Adopting a pet",
    img: "https://images.unsplash.com/photo-1600469802026-4358d4e89df3?"
  },
  {
    title: "12 Reasons to adopt, don't shop!",
    date: "08.13.2025",
    tag: "Adopting a pet",
    img: "https://images.unsplash.com/photo-1601328318547-44567d853f3b"
  },
  {
    title: "Essential supplies every new pet owner needs",
    date: "08.15.2025",
    tag: "Pet Care",
    img: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb"
  },
  {
    title: "Understanding your rescue pet's behavior",
    date: "08.17.2025",
    tag: "Pet Behavior",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb"
  },
  {
    title: "Health checkups: What to expect in your first vet visit",
    date: "08.20.2025",
    tag: "Pet Health",
    img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97"
  }
];

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const postsPerPage = 3;

  const nextPosts = () => {
    if (currentIndex + postsPerPage < posts.length) {
      setCurrentIndex(currentIndex + postsPerPage);
    }
  };

  const prevPosts = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - postsPerPage);
    }
  };

  const currentPosts = posts.slice(currentIndex, currentIndex + postsPerPage);

  return (
    <section className="blog">
      <h2>Latest blog posts</h2>
      <div style={{ position: 'relative' }}>
        <button 
          onClick={prevPosts}
          disabled={currentIndex === 0}
          style={{
            position: 'absolute',
            left: '-60px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: currentIndex === 0 ? '#f0f0f0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: currentIndex === 0 ? '#ccc' : 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            fontSize: '20px',
            fontWeight: 'bold',
            zIndex: 10,
            boxShadow: currentIndex === 0 ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (currentIndex !== 0) {
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentIndex !== 0) {
              e.target.style.transform = 'translateY(-50%) scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }
          }}
        >
          <span style={{ marginLeft: '-2px' }}>&lt;</span>
        </button>
        
        <div className="blog-grid">
          {currentPosts.map((post, i) => (
            <div key={currentIndex + i} className="blog-card">
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

        <button 
          onClick={nextPosts}
          disabled={currentIndex + postsPerPage >= posts.length}
          style={{
            position: 'absolute',
            right: '-60px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: currentIndex + postsPerPage >= posts.length ? '#f0f0f0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: currentIndex + postsPerPage >= posts.length ? '#ccc' : 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            cursor: currentIndex + postsPerPage >= posts.length ? 'not-allowed' : 'pointer',
            fontSize: '20px',
            fontWeight: 'bold',
            zIndex: 10,
            boxShadow: currentIndex + postsPerPage >= posts.length ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (currentIndex + postsPerPage < posts.length) {
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentIndex + postsPerPage < posts.length) {
              e.target.style.transform = 'translateY(-50%) scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }
          }}
        >
          <span style={{ marginRight: '-2px' }}>&gt;</span>
        </button>
      </div>
      
      <style jsx>{`
        .blog {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .blog h2 {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2rem;
          color: #333;
        }
        
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }
        
        .blog-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        }
        
        .blog-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .blog-info {
          padding: 1.5rem;
        }
        
        .blog-tag {
          background: #e3f2fd;
          color: #1976d2;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .blog-info h3 {
          margin: 1rem 0 0.5rem 0;
          font-size: 1.25rem;
          color: #333;
          line-height: 1.4;
        }
        
        .blog-date {
          color: #666;
          font-size: 0.875rem;
        }
      `}</style>
    </section>
  );
};

export default Blog;