const { query } = require('express');
const Car = require('../models/Car');

// Create a car
exports.createCar = async (req, res) => {
    try {
        const { title, description, tags, images } = req.body;
        const ownerId = req.user.id; // Assuming the user ID is available from JWT auth middleware

        if (images.length > 10) {
            return res.status(400).json({ message: 'You can upload a maximum of 10 images.' });
        }

        const newCar = new Car({
            title,
            description,
            tags,
            images,
            user: ownerId
        });

        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getCars = async (req, res) => {
  try {
      // Log the user ID to verify the request's authenticity

      // Fetch cars where the 'user' field matches the authenticated user's ID
      const cars = await Car.find({ user: req.user }); // Use req.user.id to query the cars

      if (!cars) {
          return res.status(404).json({ message: 'No cars found for this user' });
      }

      // Return the cars as a response
      res.json(cars);
  } catch (error) {
      console.error('Error fetching cars:', error); // Log the error for debugging
      res.status(500).json({ message: 'Server error' });
  }
};

  
  
  // Get car by ID
  exports.getCarById = async (req, res) => {
    try {
      const carId = req.params.id; // Get the car ID from the URL params
      const car = await Car.findById(carId).populate('user'); // Populate userId if it's a reference
  
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      res.json(car);
    } catch (error) {
      console.error('Error fetching car details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

exports.updateCar = async (req, res) => {
    const { id } = req.params;
    const { title, description, tags, images } = req.body;
  
    // Ensure all required fields are present
    if (!title || !description || !tags) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
  
    try {
      // If images exist, check if they are correctly formatted or an array
      if (images && Array.isArray(images)) {
        // Handle image-related logic here
      }
  
      const car = await Car.findById(id);
  
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      // Update the car's fields, ensuring all data is valid
      car.title = title.toString();
      car.description = description.toString();
      car.tags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
  
      // Assuming you handle image update logic here
      car.images = images || car.images; // Only update if new images are provided
  
      // Save the updated car document
      await car.save();
  
      res.status(200).json({ message: 'Car updated successfully', car });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  


// Delete car by ID
exports.deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findById(carId);
    

    await Car.findByIdAndDelete(carId);
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    console.error(err); // Log the error to server console
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchCars = async (req, res) => {
   const keyword = req.query.search
   console.log(keyword);
      
};

