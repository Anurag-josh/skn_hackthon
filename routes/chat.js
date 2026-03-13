// routes/chat.js
const express = require('express');
const router = express.Router();

// This route will render your main chat application page
router.get('/', (req, res) => {
    // Make sure you have a view file named 'chatindex.ejs' in your 'views' folder
    res.render('chatindex'); 
});

module.exports = router;