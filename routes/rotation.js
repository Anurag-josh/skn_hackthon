const express = require('express');
const router = express.Router();

// This route serves the new rotation.ejs page
router.get('/rotation', (req, res) => {
    // We pass the selected crop from the URL to the EJS template
    res.render('rotation', {
        locale: req.session.locale || 'en',
        __: res.locals.__ 
    });
});

module.exports = router;