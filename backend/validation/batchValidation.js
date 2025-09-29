const { z } = require('zod');

const batchIngredient = z.object({
  ingredientId: z.string().min(1),
  quantity: z.number().min(0)
});

const batchBody = z.object({
  name: z.string().min(1).max(120).transform(v => v.trim()),
  userId: z.string().min(1),
  unitsProduced: z.number().int().min(1),
  sellingPricePerUnit: z.number().min(0).optional(),
  totalGrossRevenue: z.number().min(0).optional(),
  ingredients: z.array(batchIngredient).min(1)
}).refine(d => {
    const hasPerUnit = typeof d.sellingPricePerUnit === 'number';
    const hasTotal = typeof d.totalGrossRevenue === 'number';
    return (hasPerUnit || hasTotal) && !(hasPerUnit && hasTotal );
}, {
    message: 'Provide either sellingPricePerUnit or totalGrossRevenue (not both)',
    path: ['price']
  });
  
  function validateBatch(req, res, next) {
    try {
      req.body = batchBody.parse(req.body);
      next();
    } catch (e) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: e.errors?.map(er => ({ field: er.path.join('.'), message: er.message })) || []
      });
    }
  }
  
  module.exports = { validateBatch };