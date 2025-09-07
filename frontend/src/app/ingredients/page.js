'use client';

import { useState, useEffect } from 'react';
import AddIngredientForm from '../../../components/AddIngredientForm';
import { ingredientAPI } from '../../../lib/api';

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch ingredients on mount
  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const result = await ingredientAPI.getIngredients('test-user');
      setIngredients(result.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientAdded = (newIngredient) => {
    setIngredients((prev) => [...prev, newIngredient]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Ingredients</h1>
          <p className="text-slate-500">
            Manage your ingredient inventory and costs
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-md bg-[rgb(var(--primary))] text-white hover:bg-[rgb(var(--primary))]/90"
        >
          Add Ingredient
        </button>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left font-medium px-4 py-3">Name</th>
              <th className="text-left font-medium px-4 py-3">Unit Type</th>
              <th className="text-left font-medium px-4 py-3">Unit Cost</th>
              <th className="text-left font-medium px-4 py-3">Supplier</th>
              <th className="text-left font-medium px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-slate-500">
                  Loading ingredients...
                </td>
              </tr>
            ) : ingredients.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-slate-500">
                  No ingredients found. Add your first ingredient!
                </td>
              </tr>
            ) : (
              ingredients.map((ingredient) => (
                <tr key={ingredient.id} className="border-t">
                  <td className="px-4 py-3">{ingredient.name}</td>
                  <td className="px-4 py-3">{ingredient.unitType}</td>
                  <td className="px-4 py-3">
                    ${ingredient.unitCost.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">{ingredient.supplier || '-'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="px-2 py-1 border rounded-md hover:bg-slate-50">
                        Edit
                      </button>
                      <button className="px-2 py-1 border rounded-md hover:bg-slate-50">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Ingredient Modal */}
      {isModalOpen && (
        <AddIngredientForm
          onClose={() => setIsModalOpen(false)}
          onIngredientAdded={handleIngredientAdded}
        />
      )}
    </div>
  );
}
