const mongoose = require('mongoose');

const cropTaskSchema = new mongoose.Schema({
    crop_id: { type: String, required: true },
    task_name_key: { type: String, required: true },
    task_description_key: { type: String, required: true },
    days_after_sowing: { type: Number, required: true },
    task_type: { type: String, required: true }
});

module.exports = mongoose.model('CropTask', cropTaskSchema);