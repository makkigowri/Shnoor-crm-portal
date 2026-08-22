import { useEffect, useMemo, useState } from "react";
import { Phone, Mail, Users2, Building2, Contact, KanbanSquare, History } from "lucide-react";
import ListToolbar from "../../components/employee/ListToolbar";
import FilterSelect from "../../components/employee/FilterSelect";
import EmptyState from "../../components/employee/EmptyState";
import { ACTIVITY_TYPES } from "../../mock/activities";
import { getActivities } from "../../services/employeeService";
const TYPE_ICON = {
  Call: Phone,
  Email: Mail,
  Meeting: Users2,
  "Lead Update": Building2,
  "Customer Update": Contact,
  "Deal Update": KanbanSquare,
};
const TYPE_COLOR = {
  Call: "bg-blue-50 text-blue-600",
  Email: "bg-violet-50 text-violet-600",
  Meeting: "bg-emerald-50 text-emerald-600",
  "Lead Update": "bg-amber-50 text-amber-600",
  "Customer Update": "bg-sky-50 text-sky-600",
  "Deal Update": "bg-orange-50 text-orange-600",
};
function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    let isMounted = true;
    async function loadActivities() {
      try {
        setLoading(true);
        setError("");
        const response = await getActivities();
        if (!isMounted) return;
        setActivities(response.data);
      } catch (err) {
        if (!isMounted) return;
        setError(err.friendlyMessage || "Unable to load activities.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadActivities();
    return () => {
      isMounted = false;
    };
  }, []);
  const filtered = useMemo(() => {
    return activities.filter((a) => {
      const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || (a.relatedTo || "").toLowerCase().includes(search.toLowerCase());
      const matchesType = type ? a.type === type : true;
      return matchesSearch && matchesType;
    });
  }, [activities, search, type]);
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <ListToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search activities..."
        filters={<FilterSelect value={type} onChange={setType} options={ACTIVITY_TYPES} allLabel="All Types" />}
      />
      {error && (
        <div className="mx-6 mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}
      {loading ? (
        <div className="p-6 text-sm text-gray-500">Loading activities...</div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={History} title="No activities found" description="Nothing matches this filter yet." />
      ) : (
        <div className="p-6">
          <ol className="relative border-l border-gray-200 ml-3 space-y-6">
            {filtered.map((a) => {
              const Icon = TYPE_ICON[a.type] || History;
              return (
                <li key={a.id} className="ml-6">
                  <span className={`absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white ${TYPE_COLOR[a.type]}`}>
                    <Icon size={15} />
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <p className="text-sm font-medium text-gray-900">{a.title}</p>
                    <span className="text-xs text-gray-400">{a.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{a.relatedTo} · {a.type}</p>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
export default Activities;
