import React, { useState } from "react";

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

export default Newsletter;
