<<<<<<< HEAD
import Pet from '../models/pet.js';
import axios from 'axios';

export const uploadPet = async (req, res) => {
  try {
    // Get form data
    const { name, type, breed, age, gender, location, phone, diet } = req.body;
    let imageUrl = '';
    // Handle image upload to Cloudinary
    if (req.file) {
      const data = new FormData();
      data.append('file', req.file.buffer, req.file.originalname);
      data.append('upload_preset', 'ml_default'); // You may want to set your preset
      const cloudinaryRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dgd9lwknt/image/upload',
        data,
        { headers: data.getHeaders() }
      );
      imageUrl = cloudinaryRes.data.secure_url;
    }
    // Save pet info
    const pet = new Pet({ name, type, breed, age, gender, location, phone, diet, imageUrl });
    await pet.save();
    res.status(201).json({ message: 'Pet added', pet });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading pet', error: err.message });
  }
};

export const getPets = async (req, res) => {
  try {
    const { type } = req.query;
    const pets = type ? await Pet.find({ type }) : await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pets', error: err.message });
=======
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
>>>>>>> 2f5902e51a5554839b7167716ff1a2ca15518634
  }
};
