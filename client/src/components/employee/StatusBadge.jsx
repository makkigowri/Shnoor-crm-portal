const STYLES = {
  New: "bg-blue-50 text-blue-700 border-blue-200",
  Contacted: "bg-amber-50 text-amber-700 border-amber-200",
  Qualified: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Unqualified: "bg-gray-100 text-gray-600 border-gray-200",
  Converted: "bg-violet-50 text-violet-700 border-violet-200",
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Inactive: "bg-gray-100 text-gray-600 border-gray-200",
  "At Risk": "bg-red-50 text-red-700 border-red-200",
  Proposal: "bg-amber-50 text-amber-700 border-amber-200",
  Negotiation: "bg-orange-50 text-orange-700 border-orange-200",
  Won: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Lost: "bg-red-50 text-red-700 border-red-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Low: "bg-gray-100 text-gray-600 border-gray-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-red-50 text-red-700 border-red-200",
};
function StatusBadge({ value }) {
  const style = STYLES[value] || "bg-gray-100 text-gray-600 border-gray-200";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${style}`}>
      {value}
    </span>
  );
}
export default StatusBadge;
