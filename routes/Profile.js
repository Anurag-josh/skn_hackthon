const express = require('express');
const router = express.Router();
const User = require('../models/user');
// *** CHANGE 1: Import the Crop and CropTask models ***
const Crop = require('../models/Crop');
const CropTask = require('../models/CropTask');

// Profile route - render the profile page
router.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please login to access your profile');
        return res.redirect('/login');
    }
    // No changes needed here
    res.render('Profile', { farmerId: req.user._id });
});

// *** CHANGE 2: ADD THE MISSING /api/crops ROUTE ***
router.get('/api/crops', async (req, res) => {
    try {
        // Fetch all crops from the database, selecting only the fields we need
        const crops = await Crop.find({}).select('crop_id crop_name_key variety_key');
        res.json(crops);
    } catch (error) {
        console.error('Error fetching crops:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// *** CHANGE 3: ADD THE MISSING /api/generate-calendar ROUTE ***
router.post('/api/generate-calendar', async (req, res) => {
    try {
        const { crop_id, sowing_date } = req.body;
        if (!crop_id || !sowing_date) {
            return res.status(400).json({ message: 'Crop ID and sowing date are required.' });
        }

        // Find all tasks associated with the selected crop_id
        const tasks = await CropTask.find({ crop_id: crop_id });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found for this crop.' });
        }

        const sowingDate = new Date(sowing_date);

        // Create the event schedule
        const generatedEvents = tasks.map(task => {
            const eventDate = new Date(sowingDate);
            eventDate.setDate(eventDate.getDate() + task.days_after_sowing);

            return {
                date: eventDate.toISOString().split('T')[0], // Format as "YYYY-MM-DD"
                title_key: task.task_name_key,
                description_key: task.task_description_key,
                type: task.task_type
            };
        });

        res.json(generatedEvents);

    } catch (error) {
        console.error('Error generating calendar:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// API endpoint to get farmer data
router.get('/api/farmer-data/:farmerId', async (req, res) => {
    try {
        const farmerId = req.params.farmerId;
        // This route should also be updated to fetch the mainCrop_key in your User model
        const farmer = await User.findById(farmerId);
        
        if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }
        
        res.json(farmer);
    } catch (error) {
        console.error('Error fetching farmer data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// *** CHANGE 4: REMOVE THE OLD, HARDCODED /api/crop-calendar ROUTE ***
// The entire block for this route has been deleted as it is no longer needed.


module.exports = router;