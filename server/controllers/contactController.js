import Contact from "../models/contact.js";

const CONTACT_STATUSES = ["unread", "read", "responded"];

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

export const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json(contacts);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch contact messages", error: error.message });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!CONTACT_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    return res.json({ message: "Contact status updated", contact });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update contact status", error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    return res.json({ message: "Contact message deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete contact message", error: error.message });
  }
};