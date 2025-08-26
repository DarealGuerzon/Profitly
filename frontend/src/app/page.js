export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Total Net Profit", "Total Revenue", "Avg Profit Margin", "Total Batches"].map((title, i) => (
          <div key={i} className="card p-5">
            <div className="text-sm text-slate-500">{title}</div>
            <div className="mt-2 text-2xl font-semibold">$0.00</div>
            <div className="mt-1 text-xs text-slate-500">+0% from last month</div>
          </div>
        ))}
      </section>

      {/* Charts grid placeholders */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cost Breakdown by Ingredient</h2>
          </div>
          <div className="h-72 grid place-items-center text-slate-400">Pie chart</div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Profit Margin by Batch</h2>
          </div>
          <div className="h-72 grid place-items-center text-slate-400">Bar chart</div>
        </div>
      </section>

      <section className="card p-5">
        <h2 className="text-lg font-semibold">Profit Trends Over Time</h2>
        <div className="h-64 grid place-items-center text-slate-400">Line chart</div>
      </section>

      <section className="card p-5">
        <h2 className="text-lg font-semibold">Cost Optimization Insights</h2>
        <ul className="mt-3 text-sm text-slate-600 space-y-2">
          <li>Top Cost Contributors — placeholder</li>
          <li>Low Margin Alert — placeholder</li>
        </ul>
      </section>
    </div>
  );
}