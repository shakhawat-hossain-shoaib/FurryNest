import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuCat } from "react-icons/lu";
import { PiDog } from "react-icons/pi";
import { FaHandsHelping } from "react-icons/fa";
import { FaDonate } from "react-icons/fa";
import { FaArrowLeft, FaCalendarAlt, FaUser, FaHeart, FaComments, FaShare } from "react-icons/fa";
import "../style/Home.css";

const QuickNav = () => {
  const options = [
    {
      text: "Adopt a Dog",
      icon: <PiDog />,
      action: "Find your perfect canine companion",
      link: "/adopt-dog"
    },
    {
      text: "Adopt a Cat",
      icon: <LuCat />,
      action: "Discover your feline friend",
      link: "/adopt-cat"
    },
    {
      text: "Add Pet",
      icon: <FaHeart />,
      action: "Add a new pet listing",
      link: "/add"
    },
    {
      text: "Volunteer",
      icon: <FaHandsHelping />,
      action: "Help animals in need",
      link: "/volunteer"
    },
    {
      text: "Donate",
      icon: <FaDonate />,
      action: "Support our mission",
      link: "/donate"
    },
  ];

  return (
    <section className="quick-nav-section">
      <h2>Quick Actions</h2>
      <div className="quick-nav">
        {options.map((opt, i) => (
          <div key={i} className="quick-card" tabIndex={0}>
            <div className="icon">{opt.icon}</div>
            <h3>{opt.text}</h3>
            <p>{opt.action}</p>
            {opt.link !== "#" ? (
              <Link to={opt.link} className="quick-btn">Learn More</Link>
            ) : (
              <button className="quick-btn">Learn More</button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const FeaturedPets = () => {
  const pets = [
    {
      name: "Fido",
      intro: "Hi I'm Fido, and I think I might be a dog...",
      type: "Puppy",
      img: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
      color: "#A0E7E5"
    },
    {
      name: "Marcia",
      intro: "Hi I'm Marcia, and I like keeping to myself.",
      type: "Cat - Adult",
      img: "https://plus.unsplash.com/premium_photo-1723514553579-b589437b3b06?",
      color: "#B4D8FD"
    },
    {
      name: "Milo",
      intro: "Hi I'm Milo, and I'm looking for a very special owner.",
      type: "Senior",
      img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
      color: "#FFF6A1"
    },
    {
      name: "Misay",
      intro: "Hi I'm Misay, the low flying cloud dog.",
      type: "Puppy",
      img: "https://plus.unsplash.com/premium_photo-1723708863829-7a079bbcc149?",
      color: "#FDE9F3"
    },
    {
      name: "Polly",
      intro: "Hi I'm Polly, and I'm a very good girl!",
      type: "Adult",
      img: "https://plus.unsplash.com/premium_photo-1723708879915-d54e5fb31aca?",
      color: "#F3C4FB"
    },
    {
      name: "Freddie",
      intro: "Hi I'm Freddie, will you Netflix and chill with me?",
      type: "Senior",
      img: "https://images.unsplash.com/photo-1537815749002-de6a533c64db",
      color: "#C1FFD7"
    },
    {
      name: "Bella",
      intro: "Hi I'm Bella, and I love cuddles and belly rubs!",
      type: "Young Adult",
      img: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a",
      color: "#FFE4E1"
    },
    {
      name: "Rocky",
      intro: "Hi I'm Rocky, and I'm ready for adventures!",
      type: "Adult",
      img: "https://images.unsplash.com/photo-1552053831-71594a27632d",
      color: "#E6F3FF"
    }
  ];

  return (
    <section className="featured">
      <h2>Featured fluff balls...</h2>
      <div className="pet-grid">
        {pets.slice(0, 8).map((pet, index) => (
          <div 
            key={index} 
            className="pet-card" 
            style={{ 
              '--background': pet.color,
              background: pet.color
            }}
          >
            <img
              src={pet.img + "?w=400&h=400&fit=facearea&facepad=4"}
              alt={pet.name}
            />
            <p>{pet.intro}</p>
            <button className="adopt-btn">Adopt Me!</button>
          </div>
        ))}
      </div>
    </section>
  );
};


const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const successStories = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600469801983-3d0b47a2059a",
      name: "Miso",
      story: "The first day we brought Miso home, he didn't cry at all on the car ride home. He was incredibly curious, and wanted to explore absolutely everything. Since I already had an adult cat at home, I tried to keep Miso secluded in our study, but he had other plans! As soon as his prayer opened that door, Miso came dashing out, right up to Katsu, and Katsu kissed him. Best friends for life.",
      author: "The Dorian Family & Miso"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1601328318547-44567d853f3b",
      name: "Buddy",
      story: "When we first met Buddy at the shelter, he was so shy and scared. But after just a few weeks in our home, his true personality started to shine. Now he's the most playful and loving dog we've ever had. He loves going on walks, playing fetch, and cuddling on the couch. He's truly become the heart of our family.",
      author: "The Johnson Family & Buddy"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600469802026-4358d4e89df3?",
      name: "Luna",
      story: "Luna was found as a stray kitten, and we weren't sure if she would ever trust humans again. But with patience and love, she slowly started to come out of her shell. Now she's the most affectionate cat, always purring and following us around the house. She's proof that every animal deserves a second chance.",
      author: "The Martinez Family & Luna"
    }
  ];

  const nextStory = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + successStories.length) % successStories.length);
  };

  const currentStory = successStories[currentIndex];

  return (
    <section className="stories">
      <h2>Success Stories</h2>
      <div className="stories-container">
        <button 
          onClick={prevStory}
          className="story-nav-btn story-nav-left"
          aria-label="Previous story"
        >
          <span>‹</span>
        </button>

        <div className="story">
          <div className="story-image-container">
            <img
              src={currentStory.image}
              alt={`${currentStory.name} the pet`}
              className="story-pet"
            />
          </div>
          <div className="story-content">
            <h3>{currentStory.name}'s Story</h3>
            <blockquote>
              "{currentStory.story}"
            </blockquote>
            <span className="testimonial-author">{currentStory.author}</span>
          </div>
        </div>

        <button 
          onClick={nextStory}
          className="story-nav-btn story-nav-right"
          aria-label="Next story"
        >
          <span>›</span>
        </button>
      </div>
    </section>
  );
};

const Newsletter = () => {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for signing up, ${form.name}!`);
    setForm({ name: "", email: "" });
  };

  return (
    <section className="newsletter">
      <h2>Sign up to our newsletter*</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email Address
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <button className="primary-btn" type="submit">
          Sign me up!
        </button>
      </form>
      <small>
        *All inspiration and dog spam, never any spam email!
      </small>
    </section>
  );
};

const BlogArticle = () => {
  const blogArticles = [
    {
      id: 1,
      title: "The Heartwarming Story of Max's Adoption",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Adoption Stories",
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&h=400&fit=crop",
      excerpt: "When Sarah first met Max at our shelter, she knew he was the one. This Golden Retriever had been waiting for his forever home for months...",
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      title: "Essential Tips for New Pet Parents",
      author: "Dr. Emily Thompson",
      date: "March 12, 2024",
      category: "Pet Care",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=400&fit=crop",
      excerpt: "Bringing a new pet into your home is an exciting experience, but it also comes with responsibilities. Here are our top tips for new pet parents...",
      likes: 67,
      comments: 23
    }
  ];

  return (
    <section className="blog-section">
      <h2>Latest from Our Blog</h2>
      <div className="blog-grid">
        {blogArticles.map((article) => (
          <div key={article.id} className="blog-card">
            <img src={article.image} alt={article.title} />
            <div className="blog-content">
              <div className="blog-category">{article.category}</div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <div className="blog-meta">
                <span>{article.author}</span>
                <span>{article.date}</span>
              </div>
              <Link to={`/blog/${article.id}`} className="read-more-btn">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Connecting vulnerable animals with their forever families
          </h1>
          <p className="hero-subtitle">
            One adoption at a time
          </p>
          <button className="hero-btn">
            Adopt, don't shop
          </button>
        </div>
      </section>

      {/* Quick Navigation */}
      <QuickNav />

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="about-title">
            A little bit about us.
          </h2>
          <p className="about-description">
            We are dedicated to connecting loving families with pets in need. Our
            mission is to make every adoption a success story filled with hope and
            care.
          </p>
          <button className="about-btn">
            Contact Us
          </button>
        </div>
      </section>

      {/* Featured Pets */}
      <FeaturedPets />

      {/* Success Stories */}
      <SuccessStories />

      {/* Blog Section */}
      <BlogArticle />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
