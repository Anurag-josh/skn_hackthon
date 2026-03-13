
const Activity = require('../models/activityModel');
const fs = require('fs'); // *** NEW: Import Node.js File System module ***
const path = require('path');

// renderLogActivityForm and saveActivityLog remain the same
exports.renderLogActivityForm = (req, res) => { 
     const today = new Date().toISOString().split('T')[0];
    res.render('logActivity', { 
        pageTitle: 'Log New Activity', 
        today: today 
    });
 };
exports.saveActivityLog = async (req, res) => { 
     try {
        const farmerId = req.user.id; 

        // --- UPDATED: Destructure new fields ---
        const { activityType, activityDate, description, materialName, quantity, unit, cost } = req.body;

        if (!activityType || !activityDate) {
            return res.status(400).send('Activity Type and Date are required.');
        }

        const newActivityData = { 
            farmerId, 
            activityType, 
            activityDate, 
            description, 
            materialName, 
            quantity, 
            unit,
            cost // Add cost to the data object
        };

        // --- NEW: Handle the uploaded file ---
        if (req.file) {
            // Construct the URL path to the saved image
            // We remove 'public' from the path because it's served statically
            newActivityData.receiptImageUrl = req.file.path.replace('public', '');
        }
        
        const newActivity = new Activity(newActivityData);
        await newActivity.save();

        res.redirect('/activity/history');

    } catch (error) {
        console.error('Error saving activity:', error);
        res.status(500).send('Server error while saving activity.');
    }
 };
exports.getActivityHistory = async (req, res) => { 
     try {
        const farmerId = req.user.id;
        const activities = await Activity.find({ farmerId: farmerId }).sort({ activityDate: -1 });

        res.render('activityHistory', {
            pageTitle: 'Activity History',
            activities: activities
        });

    } catch (error) {
        console.error('Error fetching activity history:', error);
        res.status(500).send('Server error');
    }
 };


// *** NEW CONTROLLER FUNCTIONS ***

// @desc    Display a single activity in detail
// @route   GET /activity/:id
exports.renderActivityDetail = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).send('Activity not found.');
        }
        res.render('activityDetail', { // We will create this new view file
            pageTitle: 'Activity Details',
            activity: activity
        });
    } catch (error) {
        console.error('Error fetching activity detail:', error);
        res.status(500).send('Server error');
    }
};

// @desc    Display the edit form, pre-filled with activity data
// @route   GET /activity/:id/edit
exports.renderEditForm = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).send('Activity not found.');
        }
        // We reuse the logActivity view, but pass the activity data to it
        res.render('logActivity', {
            pageTitle: 'Edit Activity',
            activity: activity, // Pass the activity object
            today: new Date().toISOString().split('T')[0]
        });
    } catch (error) {
        console.error('Error fetching activity for edit:', error);
        res.status(500).send('Server error');
    }
};

// @desc    Update an activity in the database
// @route   POST /activity/:id/edit
exports.updateActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).send('Activity not found.');
        }

        // Update fields from the form
        const { activityType, activityDate, description, materialName, quantity, unit, cost } = req.body;
        activity.activityType = activityType;
        activity.activityDate = activityDate;
        activity.description = description;
        activity.materialName = materialName;
        activity.quantity = quantity;
        activity.unit = unit;
        activity.cost = cost;

        // Handle file upload
        if (req.file) {
            // If a new receipt is uploaded, delete the old one first
            if (activity.receiptImageUrl) {
                const oldImagePath = path.join(__dirname, '..', 'public', activity.receiptImageUrl);
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error("Error deleting old receipt:", err);
                });
            }
            // Set the new receipt image URL
            activity.receiptImageUrl = req.file.path.replace('public', '');
        }

        await activity.save();
        res.redirect('/activity/history');

    } catch (error) {
        console.error('Error updating activity:', error);
        res.status(500).send('Server error');
    }
};

// @desc    Delete an activity from the database
// @route   POST /activity/:id/delete
exports.deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).send('Activity not found.');
        }

        // Delete the associated receipt image from the server storage
        if (activity.receiptImageUrl) {
            const imagePath = path.join(__dirname, '..', 'public', activity.receiptImageUrl);
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Error deleting receipt file:", err);
            });
        }
        
        // Remove the activity from the database
        await activity.deleteOne();

        res.redirect('/activity/history');
        
    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).send('Server error');
    }
};