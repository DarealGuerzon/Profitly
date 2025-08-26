export default function BatchesPage() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Batches</h1>
            <p className="text-slate-500">Create and track your production batches</p>
          </div>
          <button className="px-4 py-2 rounded-md bg-[rgb(var(--primary))] text-white">Create Batch</button>
        </div>
  
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left font-medium px-4 py-3">Batch Name</th>
                  <th className="text-left font-medium px-4 py-3">Date</th>
                  <th className="text-left font-medium px-4 py-3">Units</th>
                  <th className="text-left font-medium px-4 py-3">Gross Revenue</th>
                  <th className="text-left font-medium px-4 py-3">Total Costs</th>
                  <th className="text-left font-medium px-4 py-3">Net Profit</th>
                  <th className="text-left font-medium px-4 py-3">Margin</th>
                  <th className="text-left font-medium px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3">Chicken Biryani Batch #1</td>
                  <td className="px-4 py-3">2024-01-15</td>
                  <td className="px-4 py-3">50</td>
                  <td className="px-4 py-3">$750.00</td>
                  <td className="px-4 py-3">$485.00</td>
                  <td className="px-4 py-3">$265.00</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full bg-slate-100">35.3%</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="px-2 py-1 border rounded-md">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }