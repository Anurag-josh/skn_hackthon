const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const multer = require('multer');
const path = require('path');

// --- MULTER CONFIGURATION (No changes here) ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/receipts/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
// --- END OF MULTER CONFIGURATION ---

// --- EXISTING ROUTES ---
router.get('/log', activityController.renderLogActivityForm);
router.post('/log', upload.single('receiptImage'), activityController.saveActivityLog);
router.get('/history', activityController.getActivityHistory);


// *** NEW ROUTES FOR EDIT AND DELETE ***

// 1. GET: Display a single activity's details
router.get('/:id', activityController.renderActivityDetail);

// 2. GET: Display the form to edit an activity
router.get('/:id/edit', activityController.renderEditForm);

// 3. POST: Handle the submission of the updated activity
router.post('/:id/edit', upload.single('receiptImage'), activityController.updateActivity);

// 4. POST: Handle the deletion of an activity
router.post('/:id/delete', activityController.deleteActivity);


module.exports = router;