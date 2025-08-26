export default function IngredientsPage() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Ingredients</h1>
            <p className="text-slate-500">Manage your ingredient inventory and costs</p>
          </div>
          <button className="px-4 py-2 rounded-md bg-[rgb(var(--primary))] text-white">Add Ingredient</button>
        </div>
  
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
              <tr className="border-t">
                <td className="px-4 py-3">Chicken Breast</td>
                <td className="px-4 py-3">kg</td>
                <td className="px-4 py-3">$12.50</td>
                <td className="px-4 py-3">Premium Meats Co.</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="px-2 py-1 border rounded-md">Edit</button>
                    <button className="px-2 py-1 border rounded-md">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }