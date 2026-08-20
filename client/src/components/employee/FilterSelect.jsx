function FilterSelect({ value, onChange, options, allLabel = "All" }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-white"
    >
      <option value="">{allLabel}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default FilterSelect;
