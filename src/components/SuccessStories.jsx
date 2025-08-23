import React from "react";

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

const SuccessStories = () => (
  <section className="stories">
    <h2>Success Stories</h2>
    <div className="stories-container">
      {successStories.map((story, index) => (
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
  </section>
);

export default SuccessStories;
