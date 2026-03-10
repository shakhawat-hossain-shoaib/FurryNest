import Blog from "../models/blog.js";

export const listBlogs = async (_req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishedAt: -1, createdAt: -1 });
    return res.json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch blog posts", error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    return res.json(blog);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch blog post", error: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, author, category, image, likes, comments, readTime } = req.body;

    if (!title || !excerpt || !content || !author || !category) {
      return res.status(400).json({ message: "title, excerpt, content, author, and category are required" });
    }

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      author,
      category,
      image,
      likes,
      comments,
      readTime,
    });

    return res.status(201).json({ message: "Blog post created", blog });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create blog post", error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    return res.json({ message: "Blog post updated", blog });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update blog post", error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    return res.json({ message: "Blog post deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete blog post", error: error.message });
  }
};
