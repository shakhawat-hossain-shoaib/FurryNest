import Pet from "../models/pet.js";
import path from "path";
import fs from "fs";

export const createPet = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    const pet = new Pet({
      ...req.body,
      imageUrl
    });
    await pet.save();
    res.status(201).json({ message: "Pet added successfully!", pet });
  } catch (error) {
    res.status(500).json({ message: "Error adding pet", error });
  }
};
