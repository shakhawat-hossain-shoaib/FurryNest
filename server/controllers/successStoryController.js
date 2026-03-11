import SuccessStory from "../models/successStory.js";

export const listSuccessStories = async (_req, res) => {
  try {
    const stories = await SuccessStory.find({ isActive: true }).sort({ createdAt: -1 });
    return res.json(stories);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch success stories", error: error.message });
  }
};

export const createSuccessStory = async (req, res) => {
  try {
    const { petName, author, story, image, isActive } = req.body;

    if (!petName || !author || !story) {
      return res.status(400).json({ message: "petName, author, and story are required" });
    }

    const created = await SuccessStory.create({
      petName,
      author,
      story,
      image,
      isActive: typeof isActive === "boolean" ? isActive : true,
    });

    return res.status(201).json({ message: "Success story created", story: created });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create success story", error: error.message });
  }
};

export const updateSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await SuccessStory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Success story not found" });
    }

    return res.json({ message: "Success story updated", story: updated });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update success story", error: error.message });
  }
};

export const deleteSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SuccessStory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Success story not found" });
    }

    return res.json({ message: "Success story deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete success story", error: error.message });
  }
};
