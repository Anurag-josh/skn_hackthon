const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    crop_id: { type: String, required: true, unique: true },
    crop_name_key: { type: String, required: true },
    variety_key: { type: String, required: true },
    avg_duration_days: { type: Number, required: true }
});

module.exports = mongoose.model('Crop', cropSchema);