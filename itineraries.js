const express = require('express');
const Itinerary = require('../models/Itinerary'); // Import the Itinerary model
const router = express.Router();

// GET all itineraries
router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find(); // Fetch all itineraries from the database
    res.json(itineraries); // Send the itineraries as the response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single itinerary by ID
router.get('/:id', async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new itinerary
router.post('/', async (req, res) => {
  const itinerary = new Itinerary({
    name: req.body.name,
    destinations: req.body.destinations,
    date: req.body.date
  });

  try {
    const newItinerary = await itinerary.save(); // Save the new itinerary to the database
    res.status(201).json(newItinerary); // Send back the saved itinerary as response
  } catch (err) {
    res.status(400).json({ message: err.message }); // Return error if something goes wrong
  }
});

// PUT (update) an itinerary by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        destinations: req.body.destinations,
        date: req.body.date
      },
      { new: true } // Return the updated document
    );
    if (!updatedItinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json(updatedItinerary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an itinerary by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedItinerary = await Itinerary.findByIdAndDelete(req.params.id);
    if (!deletedItinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json({ message: 'Itinerary deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
