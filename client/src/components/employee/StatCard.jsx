function StatCard({ icon: Icon, label, value, trend, trendLabel, accent = "blue" }) {
  const accents = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    violet: "bg-violet-50 text-violet-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${accents[accent]}`}>
          <Icon size={20} />
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{label}</p>
      </div>
      {trendLabel && <p className="text-xs text-gray-400">{trendLabel}</p>}
    </div>
  );
}

export default StatCard;
