'use client';

import { useState } from 'react';
import { ingredientAPI } from '../lib/api';


export default function AddIngredientForm({ onIngredientAdded, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        unitType: '',
        unitCost: '',
        supplier: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const result = await ingredientAPI.createIngredient({
                ...formData,
                unitCost: parseFloat(formData.unitCost),
                userId: 'test-user'
            });

            setFormData({name: '', unitType: 'g', unitCost: '', supplier: ''});
            onIngredientAdded(result.data);
            onClose();
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };
    
    if (!onClose) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add New Ingredient</h2>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Chicken Breast"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Unit Type *
                        </label>
                        <select
                            value={formData.unitType}
                            onChange={(e) => setFormData({...formData, unitType: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="g">Grams (g)</option>
                            <option value="kg">Kilograms (kg)</option>
                            <option value="ml">Milliliters (ml)</option>
                            <option value="l">Liters (l)</option>
                            <option value="pcs">Pieces (pcs)</option>
                            <option value="pack">Pack</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Unit Cost *
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            value={formData.unitCost}
                            onChange={(e) => setFormData({...formData, unitCost: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Supplier
                        </label>
                        <input
                            type="text"
                            value={formData.supplier}
                            onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Premium Meats Co."
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : 'Add Ingredient'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
