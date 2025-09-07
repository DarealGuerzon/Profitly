const express = require('express');
const { createIngredient, getIngredients } = require('../controllers/ingredientController');
const router = express.Router();

router.post('/', createIngredient);
router.get('/', getIngredients);

module.exports = router;