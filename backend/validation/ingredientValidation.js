const {z} = require('zod');

const ingredientBody = z.object({
    name: z.string().min(1).max(100).transform(v => v.trim()),
    unitType: z.enum(['g','kg','ml','l','pcs','pack']),
    unitCost: z.number().min(0),
    supplier: z.string().max(100).transform(v => v.trim()).optional(),
    userId: z.string().min(1)
});

  
function validateIngredient(req,res,next){
    try{
        req.body = ingredientBody.parse(req.body);
        next();
    } catch(e){
        return res.status(400).json({
            success: false,
            error: 'validation failed',
            details: e.errors?.map(er => ({field: er.path.join('.'),message: er.message })) || []
        });
    }
}

module.exports = { validateIngredient };