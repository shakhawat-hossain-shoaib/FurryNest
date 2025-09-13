const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});
const upload = multer({ storage });

// Upload route (no MongoDB, just save file and respond)
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    res.json({ message: "Image uploaded successfully", data: {
      name: req.body.name,
      location: req.file.path
    }});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
