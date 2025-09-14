import Contact from "../models/contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create new contact message
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();
    res.status(201).json({ 
      success: true,
      message: "Message sent successfully!" 
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to send message. Please try again." 
    });
  }
};