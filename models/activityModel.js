const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activityType: {
        type: String,
        required: true,
        enum: ['SOWING', 'IRRIGATION', 'FERTILIZER', 'PESTICIDE', 'PEST_SIGHTING', 'DISEASE_SIGHTING', 'HARVEST', 'EXPENSE']
    },
    activityDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        trim: true
    },
    materialName: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number
    },
    unit: {
        type: String
    },
    // --- NEW FIELDS ADDED ---
    cost: {
        type: Number,
        default: 0
    },
    receiptImageUrl: {
        type: String
    }
    // --- END OF NEW FIELDS ---
}, {
    timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;