const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    unitType: { type: String, required: true, enum: ['g', 'kg', 'ml', 'l', 'pcs', 'pack'] },
    unitCost: { type: Number, required: true, min: 0 },
    supplier: { type: String, trim: true },
    userId: { type: String, required: true } // For Clerk user ID
}, {
    timestamps: true,
});

module.exports = mongoose.model('Ingredient', ingredientSchema);