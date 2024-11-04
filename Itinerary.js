// models/itinerary.js
const mongoose = require('mongoose');

// Define the itinerary schema
const itinerarySchema = new mongoose.Schema({
  name: { type: String, required: true }, // The name of the itinerary
  destinations: { 
    type: [String], // An array of destinations
    required: true 
  },
  date: { 
    type: Date, // The date of the itinerary
    required: true 
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Create and export the Itinerary model
const Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports = Itinerary;
