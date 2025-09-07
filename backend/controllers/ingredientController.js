const Ingredient = require('../models/Ingredient');

exports.createIngredient = async (req, res, next) => {
    try {
        // Backend handles all validation and business logic
        const { name, unitType, unitCost, supplier, userId } = req.body;

        // Server-side validation
        if (!name || !unitType || !unitCost || !userId) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields',
                message: 'Name, unit type, unit cost, and user ID are required'
            });
        }

        if (unitCost < 0) {
            return res.status(400).json({
                success: false,
                error: 'Invalid unit cost',
                message: 'Unit cost must be positive'
            });
        }

        // Check for duplicate ingredients
        const existingIngredient = await Ingredient.findOne({
            name: name.toLowerCase().trim(),
            userId: userId
        });

        if (existingIngredient) {
            return res.status(409).json({
                success: false,
                error: 'Duplicate ingredient',
                message: `Ingredient "${name}" already exists`
            });
        }

        // Create ingredient (backend handles all processing)
        const ingredient = await Ingredient.create({
            name: name.trim(),
            unitType,
            unitCost: parseFloat(unitCost),
            supplier: supplier ? supplier.trim() : undefined,
            userId
        });

        // Success response
        res.status(201).json({
            success: true,
            message: 'Ingredient created successfully',
            data: {
                id: ingredient._id,
                name: ingredient.name,
                unitType: ingredient.unitType,
                unitCost: ingredient.unitCost,
                supplier: ingredient.supplier,
                createdAt: ingredient.createdAt
            }
        });

    } catch (error) {
        console.error('Error creating ingredient:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to create ingredient'
        });
    }
};

exports.getIngredients = async (req, res, next) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                success: false,
                error: 'User ID required',
                message: 'Please provide userId in query parameters'
            });
        }

        // Backend handles data fetching and processing
        const ingredients = await Ingredient.find({ userId })
            .sort('-createdAt')
            .select('-__v');

        res.json({
            success: true,
            message: 'Ingredients retrieved successfully',
            data: ingredients,
            count: ingredients.length
        });

    } catch (error) {
        console.error('Error fetching ingredients:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to fetch ingredients'
        });
    }
};