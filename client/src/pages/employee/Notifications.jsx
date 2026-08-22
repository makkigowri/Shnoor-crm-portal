import { useEffect, useState } from "react";
import { Bell, UserPlus, ListChecks, KanbanSquare, Contact } from "lucide-react";
import EmptyState from "../../components/employee/EmptyState";
import { getNotifications, markNotificationRead, markAllNotificationsRead } from "../../services/employeeService";
const TYPE_ICON = {
  lead: UserPlus,
  task: ListChecks,
  deal: KanbanSquare,
  customer: Contact,
};
const TYPE_COLOR = {
  lead: "bg-blue-50 text-blue-600",
  task: "bg-amber-50 text-amber-600",
  deal: "bg-emerald-50 text-emerald-600",
  customer: "bg-violet-50 text-violet-600",
};
function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const unreadCount = notifications.filter((n) => !n.read).length;
  useEffect(() => {
    let isMounted = true;
    async function loadNotifications() {
      try {
        setLoading(true);
        setError("");
        const response = await getNotifications();
        if (!isMounted) return;
        setNotifications(response.data);
      } catch (err) {
        if (!isMounted) return;
        setError(err.friendlyMessage || "Unable to load notifications.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadNotifications();
    return () => {
      isMounted = false;
    };
  }, []);
  async function markAllRead() {
    const previous = notifications;
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await markAllNotificationsRead();
    } catch (err) {
      setNotifications(previous);
      setError(err.friendlyMessage || "Unable to update notifications.");
    }
  }
  async function markRead(id) {
    const target = notifications.find((n) => n.id === id);
    if (!target || target.read) return;
    const previous = notifications;
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    try {
      await markNotificationRead(id);
    } catch (err) {
      setNotifications(previous);
      setError(err.friendlyMessage || "Unable to update notification.");
    }
  }
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <p className="text-sm text-gray-500">{unreadCount} unread notifications</p>
        <button onClick={markAllRead} className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Mark all as read
        </button>
      </div>

      {error && (
        <div className="mx-6 mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}
      {loading ? (
        <div className="p-6 text-sm text-gray-500">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up for now." />
      ) : (
        <ul className="divide-y divide-gray-50">
          {notifications.map((n) => {
            const Icon = TYPE_ICON[n.type] || Bell;
            return (
              <li
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`flex items-start gap-4 px-6 py-4 cursor-pointer transition-colors ${n.read ? "bg-white" : "bg-blue-50/40"} hover:bg-gray-50`}
              >
                <span className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${TYPE_COLOR[n.type] || "bg-gray-100 text-gray-500"}`}>
                  <Icon size={16} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{n.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{n.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.timestamp}</p>
                </div>
                {!n.read && <span className="h-2 w-2 rounded-full bg-blue-600 mt-2 shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
export default Notifications;
