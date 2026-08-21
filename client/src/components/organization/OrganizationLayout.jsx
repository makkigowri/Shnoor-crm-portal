import { Outlet } from "react-router-dom";
import { Bell, ChevronDown } from "lucide-react";
import OrganizationSidebar from "./OrganizationSidebar";
import { useAuth } from "../../context/AuthContext";

function OrganizationLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Sidebar */}
      <OrganizationSidebar />

      <div className="flex-1 min-w-0 flex flex-col">

        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-6">

          <div className="flex items-center gap-5">

            {/* Notifications */}
            <button
              type="button"
              className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
              title="Notifications"
            >
              <Bell size={20} />

              {/* Notification indicator */}
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600" />
            </button>

            {/* Divider */}
            <div className="h-8 w-px bg-slate-200" />

            {/* Account */}
            <button
              type="button"
              className="flex items-center gap-3"
            >

              {/* Avatar */}
              <div className="h-9 w-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>

              {/* User information */}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-900">
                  {user?.name || "Organization Admin"}
                </p>

                <p className="text-xs text-slate-500">
                  {user?.role === "ORG_ADMIN"
                    ? "Organization Admin"
                    : "Admin"}
                </p>
              </div>

              {/* Dropdown indicator */}
              <ChevronDown
                size={17}
                className="text-slate-400"
              />

            </button>

          </div>

        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default OrganizationLayout;