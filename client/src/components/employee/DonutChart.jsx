const COLORS = ["#2563eb", "#60a5fa", "#93c5fd", "#1d4ed8", "#38bdf8", "#0ea5e9"];

function DonutChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-sm text-gray-400">
        No data available
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const segments = data.reduce((acc, d) => {
    const fraction = d.value / total;
    const dash = fraction * circumference;
    const gap = circumference - dash;
    const prevOffset = acc.length ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
    return [...acc, { ...d, dash, gap, offset: prevOffset }];
  }, []);

  return (
    <div className="flex items-center gap-6">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <g transform="translate(80,80) rotate(-90)">
          {segments.map((s, i) => (
            <circle
              key={s.label}
              r={radius}
              cx="0"
              cy="0"
              fill="transparent"
              stroke={COLORS[i % COLORS.length]}
              strokeWidth="20"
              strokeDasharray={`${s.dash} ${s.gap}`}
              strokeDashoffset={-s.offset}
            />
          ))}
        </g>
      </svg>
      <ul className="flex flex-col gap-2">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            {d.label}
            <span className="text-gray-400">({d.value})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DonutChart;
