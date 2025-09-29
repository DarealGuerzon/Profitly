const Batch = require('../models/Batch');
const Ingredient = require('../models/Ingredient');

// Helper to validate price inputs
function validatePriceInputs(sellingPricePerUnit, totalGrossRevenue) {
  const hasPerUnit = typeof sellingPricePerUnit === 'number' && !Number.isNaN(sellingPricePerUnit);
  const hasTotal = typeof totalGrossRevenue === 'number' && !Number.isNaN(totalGrossRevenue);
  if (hasPerUnit && hasTotal) {
    return { ok: false, message: 'Provide either sellingPricePerUnit OR totalGrossRevenue, not both.' };
  }
  if (!hasPerUnit && !hasTotal) {
    return { ok: false, message: 'Provide sellingPricePerUnit or totalGrossRevenue.' };
  }
  if ((hasPerUnit && sellingPricePerUnit < 0) || (hasTotal && totalGrossRevenue < 0)) {
    return { ok: false, message: 'Price values must be positive.' };
  }
  return { ok: true };
}

exports.createBatch = async (req, res) => {
  try {
    const {
      name,
      userId,
      unitsProduced,
      sellingPricePerUnit, // optional if totalGrossRevenue provided
      totalGrossRevenue,   // optional if sellingPricePerUnit provided
      ingredients,         // [{ ingredientId, quantity }]
    } = req.body;

    // Basic validation
    if (!name || !userId || !unitsProduced || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'name, userId, unitsProduced and ingredients are required',
      });
    }
    if (unitsProduced <= 0) {
      return res.status(400).json({ success: false, error: 'Invalid unitsProduced', message: 'unitsProduced must be > 0' });
    }

    const priceCheck = validatePriceInputs(sellingPricePerUnit, totalGrossRevenue);
    if (!priceCheck.ok) {
      return res.status(400).json({ success: false, error: 'Invalid price input', message: priceCheck.message });
    }

    // Ensure no duplicate batch name for the user
    const existing = await Batch.findOne({ name: name.toLowerCase().trim(), userId });
    if (existing) {
      return res.status(409).json({ success: false, error: 'Duplicate batch', message: `Batch "${name}" already exists` });
    }

    // Compute totalCost from current ingredient unitCost values
    const ingredientIds = ingredients.map(i => i.ingredientId);
    const dbIngredients = await Ingredient.find({ _id: { $in: ingredientIds }, userId }).select('unitCost');

    const idToCost = new Map(dbIngredients.map(doc => [String(doc._id), doc.unitCost]));
    let totalCost = 0;
    for (const item of ingredients) {
      const cost = idToCost.get(String(item.ingredientId));
      if (typeof cost !== 'number') {
        return res.status(400).json({ success: false, error: 'Invalid ingredient', message: 'One or more ingredients not found' });
      }
      if (typeof item.quantity !== 'number' || item.quantity < 0) {
        return res.status(400).json({ success: false, error: 'Invalid quantity', message: 'Ingredient quantity must be >= 0' });
      }
      totalCost += cost * item.quantity;
    }

    const gross = typeof totalGrossRevenue === 'number'
      ? totalGrossRevenue
      : Number(unitsProduced) * Number(sellingPricePerUnit);

    const netProfit = gross - totalCost;
    const profitMargin = gross > 0 ? (netProfit / gross) * 100 : 0;

    const batch = await Batch.create({
      name: name.trim(),
      userId,
      unitsProduced,
      sellingPricePerUnit: typeof sellingPricePerUnit === 'number' ? sellingPricePerUnit : undefined,
      totalGrossRevenue: typeof totalGrossRevenue === 'number' ? totalGrossRevenue : undefined,
      ingredients,
      totalCost,
      netProfit,
      profitMargin,
    });

    return res.status(201).json({
      success: true,
      message: 'Batch created successfully',
      data: batch,
    });
  } catch (error) {
    console.error('Error creating batch:', error);
    return res.status(500).json({ success: false, error: 'Internal server error', message: 'Failed to create batch' });
  }
};

exports.getBatches = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID required', message: 'Provide userId in query' });
    }
    const batches = await Batch.find({ userId })
      .populate('ingredients.ingredientId')
      .sort('-createdAt')
      .select('-__v');

    return res.json({ success: true, message: 'Batches retrieved successfully', data: batches, count: batches.length });
  } catch (error) {
    console.error('Error fetching batches:', error);
    return res.status(500).json({ success: false, error: 'Internal server error', message: 'Failed to fetch batches' });
  }
};