const express = require('express');
const { createBatch, getBatches } = require('../controllers/batchController');
const router = express.Router();

router.post('/', createBatch);
router.get('/', getBatches);

module.exports = router;