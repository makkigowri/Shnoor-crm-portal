import { useEffect, useState } from "react";
import { Users, UserCheck, Mail, UserX } from "lucide-react";
import { getOrganizationDashboard } from "../services/organizationService";

function OrganizationDashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    pendingInvitations: 0,
    inactiveEmployees: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getOrganizationDashboard();

        setStats(response.data);
      } catch (error) {
        console.error("Failed to load organization dashboard:", error);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const cards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: Users,
    },
    {
      title: "Active Employees",
      value: stats.activeEmployees,
      icon: UserCheck,
    },
    {
      title: "Pending Invitations",
      value: stats.pendingInvitations,
      icon: Mail,
    },
    {
      title: "Inactive Employees",
      value: stats.inactiveEmployees,
      icon: UserX,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Organization Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your organization and employees
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      {card.title}
                    </p>

                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {loading ? "--" : card.value}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-50">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Employee Management
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              View and manage employees in your organization.
            </p>

            <button
              onClick={() =>
                (window.location.href = "/organization/employees")
              }
              className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
            >
              Manage Employees
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Invitations
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Invite employees and manage pending invitations.
            </p>

            <button
              onClick={() =>
                (window.location.href = "/organization/invitations")
              }
              className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
            >
              Manage Invitations
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Organization Settings
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            View and manage your organization settings.
          </p>

          <button
            onClick={() =>
              (window.location.href = "/organization/settings")
            }
            className="mt-5 bg-slate-800 text-white px-5 py-2.5 rounded-lg hover:bg-slate-900"
          >
            Organization Settings
          </button>
        </div>
      </main>
    </div>
  );
}

export default OrganizationDashboard;