import React from "react";

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
  }
];

const FeaturedPets = () => (
  <section className="featured">
    <h2>Featured fluff balls...</h2>
    <div className="pet-grid">
      {pets.map((pet, i) => (
        <div key={i} className="pet-card" style={{ background: pet.color }}>
          <img
            src={pet.img + "?w=400&h=400&fit=facearea&facepad=4"}
            alt={pet.name}
          />
          <p>{pet.intro}</p>
          <button className="adopt-btn">Adopt Me!</button>
        </div>
      ))}
    </div>
    <span className="featured-note">...and some very good dogs.</span>
  </section>
);

export default FeaturedPets;
