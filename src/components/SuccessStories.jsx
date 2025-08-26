import React, { useState } from "react";

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
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb",
    name: "Max",
    story: "Max came to us as an older dog who had been returned to the shelter multiple times. We knew he needed extra love and patience. After months of building trust, Max has become the most loyal companion. He may be a senior, but he has so much love to give and has taught us that age is just a number.",
    author: "The Thompson Family & Max"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    name: "Whiskers",
    story: "Whiskers was a feral cat who lived in our neighborhood for months. It took weeks of leaving food out and sitting quietly nearby before she would even come close. Now she's the most cuddly lap cat you could imagine. She follows me everywhere and purrs constantly. The transformation has been incredible.",
    author: "The Chen Family & Whiskers"
  }
];

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const storiesPerPage = 3;

  const nextStories = () => {
    if (currentIndex + storiesPerPage < successStories.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevStories = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentStories = successStories.slice(currentIndex, currentIndex + storiesPerPage);

  return (
    <section className="stories">
      <h2>Success Stories</h2>
      <div style={{ position: 'relative' }}>
        <button 
          onClick={prevStories}
          disabled={currentIndex === 0}
          style={{
            position: 'absolute',
            left: '50%',
            top: '-60px',
            transform: 'translateX(-50%)',
            background: currentIndex === 0 ? '#f0f0f0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: currentIndex === 0 ? '#ccc' : 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            fontSize: '16px',
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
              e.target.style.transform = 'translateX(-50%) scale(1.1)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentIndex !== 0) {
              e.target.style.transform = 'translateX(-50%) scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }
          }}
        >
          <span>↑</span>
        </button>

        <div className="stories-container">
          {currentStories.map((story, index) => (
            <div key={story.id} className={`story ${index % 2 === 1 ? 'story-reverse' : ''}`}>
              <div className="story-image-container">
                <img
                  src={story.image}
                  alt={`${story.name} the pet`}
                  className="story-pet"
                />
              </div>
              <div className="story-content">
                <h3>{story.name}'s Story</h3>
                <blockquote>
                  "{story.story}"
                </blockquote>
                <span className="testimonial-author">{story.author}</span>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={nextStories}
          disabled={currentIndex + storiesPerPage >= successStories.length}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '-60px',
            transform: 'translateX(-50%)',
            background: currentIndex + storiesPerPage >= successStories.length ? '#f0f0f0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: currentIndex + storiesPerPage >= successStories.length ? '#ccc' : 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            cursor: currentIndex + storiesPerPage >= successStories.length ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            zIndex: 10,
            boxShadow: currentIndex + storiesPerPage >= successStories.length ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (currentIndex + storiesPerPage < successStories.length) {
              e.target.style.transform = 'translateX(-50%) scale(1.1)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentIndex + storiesPerPage < successStories.length) {
              e.target.style.transform = 'translateX(-50%) scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }
          }}
        >
          <span>↓</span>
        </button>
      </div>

      <style jsx>{`
        .stories {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }
        
        .stories h2 {
          text-align: center;
          margin-bottom: 3rem;
          font-size: 2.5rem;
          color: #333;
        }
        
        .stories-container {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          margin: 4rem 0;
        }
        
        .story {
          display: flex;
          align-items: center;
          gap: 3rem;
          background: #fff;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .story:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }
        
        .story-reverse {
          flex-direction: row-reverse;
        }
        
        .story-image-container {
          flex-shrink: 0;
        }
        
        .story-pet {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 12px;
        }
        
        .story-content {
          flex: 1;
        }
        
        .story-content h3 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }
        
        .story-content blockquote {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #555;
          font-style: italic;
          margin-bottom: 1.5rem;
          border-left: 4px solid #667eea;
          padding-left: 1.5rem;
          margin-left: 0;
        }
        
        .testimonial-author {
          font-weight: 600;
          color: #667eea;
          font-size: 1rem;
        }
        
        @media (max-width: 768px) {
          .story {
            flex-direction: column !important;
            text-align: center;
          }
          
          .story-pet {
            width: 250px;
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
};

export default SuccessStories;