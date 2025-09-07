const API_BASE_URL = 'http://localhost:4000/api';

export const ingredientAPI = {
    async createIngredient(ingredientData) {
        try {
            const response = await fetch(`${API_BASE_URL}/ingredients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ingredientData),
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Failed to create ingredient');
            }

            return result;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async getIngredients(userId) {
        try {
            const response = await fetch(`${API_BASE_URL}/ingredients?userId=${userId}`);
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch ingredients');
            }

            return result;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};