const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const CropTask = require('../models/CropTask');

router.get('/crop-calendar', (req, res) => {
    res.render('calendar'); // This will render views/calendar.ejs
});

// ROUTE 1: Get all available crops for the dropdown menu
// GET /api/crops
router.get('/api/crops', async (req, res) => {
    try {
        const crops = await Crop.find({}, 'crop_id crop_name variety');
        if (!crops || crops.length === 0) {
            // Full fallback list matching scripts/seed.js
            const fallbackCrops = [
                { crop_id: "rice_mundakan_kerala", crop_name: "Rice (Paddy)", variety: "Mundakan Season" },
                { crop_id: "coconut_wct_kerala", crop_name: "Coconut", variety: "West Coast Tall" },
                { crop_id: "rubber_rrii105_kerala", crop_name: "Rubber", variety: "RRII 105" },
                { crop_id: "pepper_panniyur1_kerala", crop_name: "Black Pepper", variety: "Panniyur-1" },
                { crop_id: "banana_nendran_kerala", crop_name: "Banana", variety: "Nendran" },
                { crop_id: "ginger_rio_kerala", crop_name: "Ginger", variety: "Rio de Janeiro" },
                { crop_id: "turmeric_prathibha_kerala", crop_name: "Turmeric", variety: "Prathibha" },
                { crop_id: "tapioca_h226_kerala", crop_name: "Tapioca (Cassava)", variety: "Sree Vijaya (H-226)" },
                { crop_id: "cardamom_malabar_kerala", crop_name: "Cardamom", variety: "Malabar" },
                { crop_id: "bittergourd_preethi_kerala", crop_name: "Bitter Gourd", variety: "Preethi" },
                { crop_id: "okra_arka_kerala", crop_name: "Okra (Lady's Finger)", variety: "Arka Anamika" },
                { crop_id: "tomato_shakthi_kerala", crop_name: "Tomato", variety: "Shakthi" },
                { crop_id: "cucumber_aa_kerala", crop_name: "Cucumber", variety: "Arunima" },
                { crop_id: "yam_gajendra_kerala", crop_name: "Elephant Foot Yam", variety: "Gajendra" },
                { crop_id: "pineapple_kew_kerala", crop_name: "Pineapple", variety: "Kew" },
                { crop_id: "jackfruit_allseason_kerala", crop_name: "Jackfruit", variety: "All Season" },
                { crop_id: "mango_neelam_kerala", crop_name: "Mango", variety: "Neelam" },
                { crop_id: "coffee_robusta_kerala", crop_name: "Coffee", variety: "Robusta" },
                { crop_id: "arecanut_mangal_kerala", crop_name: "Arecanut", variety: "Mangala" },
                { crop_id: "nutmeg_viswa_kerala", crop_name: "Nutmeg", variety: "Viswashree" }
            ];
            return res.json(fallbackCrops);
        }
        // Return the result as json
        res.json(crops);
    } catch (error) {
        console.error("Error fetching crops:", error);
        // Full fallback list on error
        const fallbackCrops = [
            { crop_id: "rice_mundakan_kerala", crop_name: "Rice (Paddy)", variety: "Mundakan Season" },
            { crop_id: "coconut_wct_kerala", crop_name: "Coconut", variety: "West Coast Tall" },
            { crop_id: "rubber_rrii105_kerala", crop_name: "Rubber", variety: "RRII 105" },
            { crop_id: "pepper_panniyur1_kerala", crop_name: "Black Pepper", variety: "Panniyur-1" },
            { crop_id: "banana_nendran_kerala", crop_name: "Banana", variety: "Nendran" },
            { crop_id: "ginger_rio_kerala", crop_name: "Ginger", variety: "Rio de Janeiro" },
            { crop_id: "turmeric_prathibha_kerala", crop_name: "Turmeric", variety: "Prathibha" },
            { crop_id: "tapioca_h226_kerala", crop_name: "Tapioca (Cassava)", variety: "Sree Vijaya (H-226)" },
            { crop_id: "cardamom_malabar_kerala", crop_name: "Cardamom", variety: "Malabar" },
            { crop_id: "bittergourd_preethi_kerala", crop_name: "Bitter Gourd", variety: "Preethi" },
            { crop_id: "okra_arka_kerala", crop_name: "Okra (Lady's Finger)", variety: "Arka Anamika" },
            { crop_id: "tomato_shakthi_kerala", crop_name: "Tomato", variety: "Shakthi" },
            { crop_id: "cucumber_aa_kerala", crop_name: "Cucumber", variety: "Arunima" },
            { crop_id: "yam_gajendra_kerala", crop_name: "Elephant Foot Yam", variety: "Gajendra" },
            { crop_id: "pineapple_kew_kerala", crop_name: "Pineapple", variety: "Kew" },
            { crop_id: "jackfruit_allseason_kerala", crop_name: "Jackfruit", variety: "All Season" },
            { crop_id: "mango_neelam_kerala", crop_name: "Mango", variety: "Neelam" },
            { crop_id: "coffee_robusta_kerala", crop_name: "Coffee", variety: "Robusta" },
            { crop_id: "arecanut_mangal_kerala", crop_name: "Arecanut", variety: "Mangala" },
            { crop_id: "nutmeg_viswa_kerala", crop_name: "Nutmeg", variety: "Viswashree" }
        ];
        // Return fallback as json
        res.status(200).json(fallbackCrops);
    }
});

// ROUTE 2: Generate a personalized crop calendar schedule
// POST /api/generate-calendar
router.post('/api/generate-calendar', async (req, res) => {
    try {
        const { crop_id, sowing_date } = req.body;

        // Basic validation
        if (!crop_id || !sowing_date) {
            return res.status(400).json({ message: "Crop ID and sowing date are required." });
        }

        // Find all tasks associated with the selected crop
        const tasks = await CropTask.find({ crop_id: crop_id });
        
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for the selected crop." });
        }
        
        const sowingDate = new Date(sowing_date);

        // Calculate the date for each task
        const calendarEvents = tasks.map(task => {
            const eventDate = new Date(sowingDate);
            eventDate.setDate(eventDate.getDate() + task.days_after_sowing);
            
            return {
                date: eventDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                title: task.task_name,
                description: task.task_description,
                type: task.task_type
            };
        });
        // events as json
        res.json(calendarEvents);

    } catch (error) {
        console.error("Error generating calendar:", error);
        res.status(500).json({ message: "Error generating calendar schedule" });
    }
});

module.exports = router;