import React from "react";
import "./style/featured.css";

export default function Home() {
  return (
    <div className="font-sans bg-pink-50 min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-purple-800 text-white">
        <h1 className="text-xl font-bold">Adoptable</h1>
        <nav className="flex gap-6">
          <a href="#" className="hover:text-yellow-200">Home</a>
          <a href="#" className="hover:text-yellow-200">Adopt a Dog</a>
          <a href="#" className="hover:text-yellow-200">Adopt a Cat</a>
          <a href="#" className="hover:text-yellow-200">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-r from-pink-200 via-purple-200 to-yellow-100">
        <h2 className="text-3xl md:text-5xl font-bold text-purple-900 mb-6">
          Connecting vulnerable animals with their forever families
        </h2>
        <p className="text-lg text-purple-700 mb-8">
          One adoption at a time
        </p>
        <button className="bg-purple-700 text-white px-6 py-3 rounded-2xl shadow hover:bg-purple-600 transition">
          Adopt, don’t shop
        </button>
      </section>

      {/* Quick Navigation */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-8 py-12">
        {[
          "I'd like to adopt a dog",
          "I'm more of a cat person",
          "I'm interested in volunteering",
          "I'd like to make a donation",
        ].map((text, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
            <p className="text-purple-800 font-semibold">{text}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section className="text-center py-16 px-6 bg-mint-100">
        <h3 className="text-2xl font-bold text-purple-900 mb-4">
          A little bit about us
        </h3>
        <p className="text-purple-700 max-w-2xl mx-auto mb-6">
          We are dedicated to connecting loving families with animals in need of
          a forever home. Every adoption helps us rescue, care for, and protect
          vulnerable pets.
        </p>
        <button className="bg-yellow-400 px-6 py-2 rounded-xl text-purple-900 font-semibold hover:bg-yellow-300 transition">
          Contact Us
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white text-center py-6 mt-12">
        <p>© 2025 Adoptable. All rights reserved.</p>
      </footer>
    </div>
  );
}
