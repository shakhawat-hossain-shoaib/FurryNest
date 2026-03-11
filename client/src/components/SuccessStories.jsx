import React, { useEffect, useMemo, useState } from "react";
import { successStoryService } from "../services/successStoryService";

const fallbackImage =
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=1200&h=800&fit=crop";

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      try {
        const data = await successStoryService.list();
        setStories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load success stories", error);
        setStories([]);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  useEffect(() => {
    if (currentIndex >= stories.length) {
      setCurrentIndex(0);
    }
  }, [stories.length, currentIndex]);

  const normalizedStories = useMemo(
    () =>
      stories.map((story) => ({
        ...story,
        id: story._id,
        image: story.image || fallbackImage,
      })),
    [stories]
  );

  const nextStory = () => {
    if (normalizedStories.length < 2) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % normalizedStories.length);
  };

  const prevStory = () => {
    if (normalizedStories.length < 2) return;
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + normalizedStories.length) % normalizedStories.length
    );
  };

  const currentStory = normalizedStories[currentIndex];

  return (
    <section className="stories">
      <h2>Success Stories</h2>

      {loading && (
        <div className="stories-empty">
          <p>Loading success stories...</p>
        </div>
      )}

      {!loading && normalizedStories.length === 0 && (
        <div className="stories-empty">
          <p>No success stories available yet.</p>
        </div>
      )}

      {!loading && currentStory && (
        <div className="stories-container">
          <button
            onClick={prevStory}
            className="story-nav-btn story-nav-left"
            aria-label="Previous story"
            disabled={normalizedStories.length < 2}
          >
            <span>‹</span>
          </button>

          <div className="story">
            <div className="story-image-container">
              <img
                src={currentStory.image}
                alt={`${currentStory.petName} the pet`}
                className="story-pet"
              />
            </div>
            <div className="story-content">
              <h3>{currentStory.petName}'s Story</h3>
              <blockquote>"{currentStory.story}"</blockquote>
              <span className="testimonial-author">{currentStory.author}</span>
            </div>
          </div>

          <button
            onClick={nextStory}
            className="story-nav-btn story-nav-right"
            aria-label="Next story"
            disabled={normalizedStories.length < 2}
          >
            <span>›</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default SuccessStories;
