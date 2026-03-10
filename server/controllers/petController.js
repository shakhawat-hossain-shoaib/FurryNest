import Pet from '../models/pet.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const ALLOWED_STATUS = ['pending', 'approved', 'adopted', 'rejected'];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');

const toUploadsPath = (imageUrl) => {
  if (!imageUrl) return null;
  const clean = imageUrl.startsWith('/uploads/') ? imageUrl.replace('/uploads/', '') : imageUrl;
  return path.join(uploadsDir, clean);
};

const removeImageIfExists = (imageUrl) => {
  const imagePath = toUploadsPath(imageUrl);
  if (imagePath && fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
};

const buildPetPayload = (body, imageUrl) => ({
  name: body.name,
  type: body.type,
  breed: body.breed,
  age: body.age,
  description: body.description || '',
  gender: body.gender,
  location: body.location,
  phone: body.phone,
  diet: body.diet,
  owner: body.owner || 'FurryNest Shelter',
  address: body.address || '',
  ...(imageUrl ? { imageUrl } : {}),
});

export const getPetCount = async (req, res) => {
  try {
    const [dogs, cats, adoptedDogs, adoptedCats, pending] = await Promise.all([
      Pet.countDocuments({ type: 'dog', status: 'approved' }),
      Pet.countDocuments({ type: 'cat', status: 'approved' }),
      Pet.countDocuments({ type: 'dog', status: 'adopted' }),
      Pet.countDocuments({ type: 'cat', status: 'adopted' }),
      Pet.countDocuments({ status: 'pending' }),
    ]);

    const total = dogs + cats;
    res.json({
      total,
      dogs,
      cats,
      adoptedDogs,
      adoptedCats,
      adoptedTotal: adoptedDogs + adoptedCats,
      pending,
    });
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
      ...buildPetPayload(req.body, imageUrl),
      status: req.body.status && ALLOWED_STATUS.includes(req.body.status) ? req.body.status : 'approved',
    });

    await pet.save();
    res.status(201).json({ message: "Pet added successfully!", pet });
  } catch (error) {
    res.status(500).json({ message: "Error adding pet", error: error.message });
  }
};

export const getPets = async (req, res) => {
  try {
    const { type, status } = req.query;
    let query = {};

    if (type) query.type = type;

    if (status && status !== 'approved') {
      return res.status(403).json({ message: 'Admin access required for this filter' });
    }

    if (status === 'approved') {
      query.status = 'approved';
    } else {
      query.status = 'approved'; // By default, only show approved pets
    }

    const pets = await Pet.find(query).sort({ createdAt: -1 });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pets', error: err.message });
  }
};

export const getManagePets = async (req, res) => {
  try {
    const { type, status } = req.query;
    const query = {};

    if (type) query.type = type;
    if (status && status !== 'all') {
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({ message: 'Invalid pet status filter' });
      }
      query.status = status;
    }

    const pets = await Pet.find(query).sort({ createdAt: -1 });
    return res.json(pets);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching managed pet list', error: error.message });
  }
};

export const getPetById = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pet details', error: error.message });
  }
};

export const requestPet = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const pet = new Pet({
      ...buildPetPayload(req.body, imageUrl),
      status: 'pending'
    });

    await pet.save();
    res.status(201).json({ message: "Pet request submitted successfully!", pet });
  } catch (error) {
    res.status(500).json({ message: "Error submitting pet request", error: error.message });
  }
};

export const getPendingPets = async (req, res) => {
  try {
    const pendingPets = await Pet.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.json(pendingPets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending pets", error: error.message });
  }
};

export const approvePet = async (req, res) => {
  try {
    req.body.status = 'approved';
    return updatePetStatus(req, res);
  } catch (error) {
    return res.status(500).json({ message: 'Error approving pet', error: error.message });
  }
};

export const rejectPet = async (req, res) => {
  try {
    req.body.status = 'rejected';
    return updatePetStatus(req, res);
  } catch (error) {
    return res.status(500).json({ message: 'Error rejecting pet', error: error.message });
  }
};

export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPet = await Pet.findById(id);
    if (!existingPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    let imageUrl = existingPet.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
      removeImageIfExists(existingPet.imageUrl);
    }

    const updatePayload = {
      ...buildPetPayload(req.body, imageUrl),
      status: req.body.status && ALLOWED_STATUS.includes(req.body.status)
        ? req.body.status
        : existingPet.status,
    };

    const updatedPet = await Pet.findByIdAndUpdate(id, updatePayload, { new: true, runValidators: true });
    return res.json({ message: 'Pet updated successfully', pet: updatedPet });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating pet', error: error.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    removeImageIfExists(pet.imageUrl);

    await Pet.findByIdAndDelete(id);
    return res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting pet', error: error.message });
  }
};

export const updatePetStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({ message: 'Invalid pet status' });
    }

    const pet = await Pet.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    return res.json({ message: 'Pet status updated successfully', pet });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating pet status', error: error.message });
  }
};
