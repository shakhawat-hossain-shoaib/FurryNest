import React, { useState } from "react";

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

export default SuccessStories;
