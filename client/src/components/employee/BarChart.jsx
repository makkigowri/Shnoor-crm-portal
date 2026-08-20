function BarChart({ data, valueFormatter }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-sm text-gray-400">
        No data available
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end gap-4 h-48 pt-4">
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <span className="text-xs font-medium text-gray-600">
            {valueFormatter ? valueFormatter(d.value) : d.value}
          </span>
          <div
            className="w-full max-w-10 bg-blue-600 rounded-t-md hover:bg-blue-700 transition-colors"
            style={{ height: `${Math.max((d.value / max) * 100, 4)}%` }}
          />
          <span className="text-xs text-gray-400">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export default BarChart;
