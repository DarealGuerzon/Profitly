const express = require('express');
const { createIngredient, getIngredient } = require ('../controllers/ingredientController');
const router = express.Router();

router.post('/', createIngredient);
router.get('/',getIngredient);

module.exports = router;