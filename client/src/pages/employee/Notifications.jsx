import { useState } from "react";
import { Bell, UserPlus, ListChecks, KanbanSquare, Contact } from "lucide-react";
import EmptyState from "../../components/employee/EmptyState";
import { notifications as initialNotifications } from "../../mock/notifications";

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
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <p className="text-sm text-gray-500">{unreadCount} unread notifications</p>
        <button onClick={markAllRead} className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Mark all as read
        </button>
      </div>

      {notifications.length === 0 ? (
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
