const Ingredient = require('../models/Ingredient');

exports.createIngredient = async (req, res, next) => {
    try {
        const ingredient = await Ingredient.create(req.body);
        res.status(201).json(ingredient);
    } catch (err) {
        next(err);
    }
};

exports.getIngredient = async (req, res, next) => {
    try {
        const ingredients = await Ingredient.find().sort('-createdAt');
        res.json(ingredients);
    } catch (err) {
        next(err);
    }
};