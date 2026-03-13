const express = require('express');
const router = express.Router();

// This route serves the new fertilizerMarketplace.ejs page
router.get('/fertilizerMarketplace', (req, res) => {
    // We pass the selected crop from the URL to the EJS template
    res.render('fertilizerMarketplace', {
        locale: req.session.locale || 'en',
        __: res.locals.__ 
    });
});

module.exports = router;