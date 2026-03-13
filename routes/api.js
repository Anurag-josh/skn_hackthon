const express = require('express');
const router = express.Router();

// Simulated Farm Data
const farmData = {
    states: {
        'Maharashtra': { cities: ['Solapur', 'Pune', 'Nagpur', 'Nashik'] },
        'Karnataka': { cities: ['Bengaluru', 'Mysuru', 'Hubballi'] },
        'Punjab': { cities: ['Amritsar', 'Ludhiana', 'Jalandhar'] },
        'Kerala': { cities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'] }
    },
    crops: ['Sugarcane', 'Cotton', 'Rice', 'Banana', 'Wheat', 'Coconut']
};

// Simulated Chat Database
const appData = {
    communities: {
        '#Maharashtra-Solapur-Sugarcane': { users: ['Ravi Kumar'], messages: [{ sender: 'Ravi Kumar', text: 'Weather looks good for harvesting next week.', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }] },
        '#Karnataka-Bengaluru-Rice': { users: ['Anjali', 'Sanjay'], messages: Array.from({ length: 15 }, () => ({ sender: 'Sanjay', text: 'Good discussion today.' })) },
        '#Punjab-Ludhiana-Wheat': { users: ['Harpreet', 'Manjit', 'Simran'], messages: Array.from({ length: 25 }, () => ({ sender: 'Harpreet', text: 'Price is up.' })) },
    }
};

// API endpoint to get all initial data
router.get('/data', (req, res) => {
    res.json({ farmData, appData });
});

module.exports = router;