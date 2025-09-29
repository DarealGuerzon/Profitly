const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  userId: { type: String, required: true }, // Clerk user id

  unitsProduced: { type: Number, required: true, min: 1 },

  // choose one: provide per-unit price or total gross
  sellingPricePerUnit: { type: Number, min: 0 },
  totalGrossRevenue: { type: Number, min: 0 },

  // ingredient usage for this batch
  ingredients: [{
    ingredientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
    quantity: { type: Number, required: true, min: 0 }
  }],

  // computed on save (server)
  totalCost: { type: Number, default: 0 },
  netProfit: { type: Number, default: 0 },
  profitMargin: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);