function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div className="animate-pulse">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 px-6 py-4 border-b border-gray-100 last:border-0">
          {Array.from({ length: columns }).map((__, c) => (
            <div key={c} className="h-3 bg-gray-200 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableSkeleton;
