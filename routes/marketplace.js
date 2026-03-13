const express = require('express');
const router = express.Router();
const axios = require('axios');
const Marketplace = require('../models/marketplace');

// ✅ API to get local MongoDB data directly
router.get('/api', async (req, res) => {
    const { crop, district } = req.query;
    try {
        const query = {};
        if (crop) query.commodity = new RegExp(crop, 'i');
        if (district) query.district = new RegExp(district, 'i');

        const products = await Marketplace.find(query);
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// ✅ Main route: tries live API first, then fallback to latest stored DB data
router.get('/', async (req, res) => {
    const { crop, district } = req.query;
    let products = [];
    let dataDate = null;
    let userMessage = null;

    try {
        // prepare filters for live API
        const filters = { 'filters[state.keyword]': 'Maharashtra' };
        if (district) filters['filters[district.keyword]'] = district;

        // call API
        const response = await axios.get(
            'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070',
            {
                params: {
                    'api-key': '579b464db66ec23bdd00000194a092a9f1a34aab722223cb63d89b60',
                    'format': 'json',
                    'limit': 500,
                    ...filters
                },
                timeout: 5000
            }
        );

        let apiRecords = response.data.records || [];

        // apply crop filter if provided
        if (crop) {
            apiRecords = apiRecords.filter(p =>
                p.commodity && p.commodity.toLowerCase().includes(crop.toLowerCase())
            );
        }

        if (apiRecords.length > 0) {
            products = apiRecords.map(record => ({
                commodity: record.commodity || '',
                variety: record.variety || '',
                grade: record.grade || '',
                state: record.state || '',
                district: record.district || '',
                market: record.market || '',
                arrival_date: record.arrival_date || '',
                min_price: record.min_price || '',
                max_price: record.max_price || '',
                modal_price: record.modal_price || ''
            }));
            dataDate = products[0].arrival_date;
        } else {
            // fallback to local DB if API returned no usable data or no specific crop/district
            console.log("⚠ No live data found for the current query. Using latest stored data...");

            const query = {};
            if (crop) query.commodity = new RegExp(crop, 'i');
            if (district) query.district = new RegExp(district, 'i');

            const latestDayData = await Marketplace.find(query).sort({ arrival_date: -1, createdAt: -1 });

            if (latestDayData.length > 0) {
                products = latestDayData.map(doc => ({
                    commodity: doc.commodity || '',
                    variety: '',
                    grade: '',
                    state: doc.state || '',
                    district: doc.district || '',
                    market: doc.market || '',
                    arrival_date: doc.arrival_date || '',
                    min_price: doc.min_price || '',
                    max_price: doc.max_price || '',
                    modal_price: doc.modal_price || ''
                }));
                dataDate = latestDayData[0].arrival_date || 'Recent';
            } else {
                userMessage = "No previous market data available in database for this crop or district.";
            }
        }

        res.render('marketplace', { products, dataDate, userMessage });

    } catch (err) {
        console.error("❌ Failed fetching data:", err.message);
        userMessage = "The external server is taking too long. Displaying previously saved data.";

        try {
            const query = {};
            if (crop) query.commodity = new RegExp(crop, 'i');
            if (district) query.district = new RegExp(district, 'i');
            
            const latestDayData = await Marketplace.find(query).sort({ arrival_date: -1, createdAt: -1 });

            if (latestDayData.length > 0) {
                products = latestDayData.map(doc => ({
                    commodity: doc.commodity || '',
                    variety: '',
                    grade: '',
                    state: doc.state || '',
                    district: doc.district || '',
                    market: doc.market || '',
                    arrival_date: doc.arrival_date || '',
                    min_price: doc.min_price || '',
                    max_price: doc.max_price || '',
                    modal_price: doc.modal_price || ''
                }));
                dataDate = latestDayData[0].arrival_date || 'Recent';
            } else {
                 userMessage = "The external server is taking too long. No previous market data available in the database.";
            }

            res.render('marketplace', { products, dataDate, userMessage });

        } catch (dbErr) {
            console.error("❌ Database fallback also failed:", dbErr.message);
            res.render('marketplace', { products: [], dataDate: null, userMessage: "Server error. Please try again later." });
        }
    }
});

// ✅ Update route to refresh DB with new day’s data
router.get('/update-maharashtra', async (req, res) => {
    try {
        console.log("🚀 Checking for new marketplace data...");
        

        const response = await axios.get(
            'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070',
            {
                params: {
                    'api-key': '579b464db66ec23bdd00000194a092a9f1a34aab722223cb63d89b60',
                    'format': 'json',
                    'filters[state.keyword]': 'Maharashtra',
                    'limit': 500
                }
            }
        );

        const records = response.data.records || [];
        if (records.length === 0) return res.send("No new data from API.");

        const newArrivalDate = records[0].arrival_date;

        // check if already updated for this date
        const existingSameDate = await Marketplace.findOne({ arrival_date: newArrivalDate });
        if (existingSameDate) {
            return res.send(`ℹ Data for ${newArrivalDate} already exists. No update needed.`);
        }

        // clear old data
        await Marketplace.deleteMany({});
        console.log("🗑 Old data cleared.");

        // save new data
        const saved = await Marketplace.insertMany(
            records.map(record => ({
                commodity: record.commodity || '',
                state: record.state || '',
                district: record.district || '',
                market: record.market || '',
                arrival_date: record.arrival_date || '',
                min_price: record.min_price || '',
                max_price: record.max_price || '',
                modal_price: record.modal_price || ''
            }))
        );

        res.send(`✅ Updated with ${saved.length} records for ${newArrivalDate}.`);

    } catch (err) {
        console.error("❌ Update failed:", err);
        res.status(500).send("Server error updating data");
    }
});

module.exports = router;