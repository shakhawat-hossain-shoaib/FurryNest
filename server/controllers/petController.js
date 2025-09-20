import Pet from '../models/pet.js';
import path from 'path';
import fs from 'fs';

export const getPetCount = async (req, res) => {
  try {
    const [dogs, cats] = await Promise.all([
      Pet.countDocuments({ type: 'dog' }),
      Pet.countDocuments({ type: 'cat' })
    ]);
    
    const total = dogs + cats;
    res.json({ total, dogs, cats });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pet counts", error: error.message });
  }
};

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
    res.status(500).json({ message: "Error adding pet", error: error.message });
  }
};

export const getPets = async (req, res) => {
  try {
    const { type } = req.query;
    const pets = type ? await Pet.find({ type }) : await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pets', error: err.message });
  }
};
