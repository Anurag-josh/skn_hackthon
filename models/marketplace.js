const mongoose = require('mongoose');

const marketplaceSchema = new mongoose.Schema({
  commodity: String,
  state: String,
  district: String,
  market: String,
  arrival_date: String,
  min_price: String,
  max_price: String,
  modal_price: String
}, {
  timestamps: true // useful to know when data was inserted
});

const Marketplace = mongoose.model('Marketplace', marketplaceSchema);

module.exports = Marketplace;