const express = require('express');
const { createIngredient, getIngredients } = require('../controllers/ingredientController');
const { validateIngredient} = require('../validation/ingredientValidation');
const router = express.Router();

router.post('/', validateIngredient,createIngredient);
router.get('/', getIngredients);

module.exports = router;