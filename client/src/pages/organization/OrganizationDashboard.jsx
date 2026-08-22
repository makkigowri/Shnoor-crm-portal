import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Mail,
  Activity,
} from "lucide-react";
import { getOrganizationDashboard } from "../../services/organizationService";
function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>
          {description && (
            <p className="mt-1 text-xs text-slate-400">
              {description}
            </p>
          )}
        </div>
        <div className="h-11 w-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}
function OrganizationDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getOrganizationDashboard();
        setDashboard(response.data);
      } catch (error) {
        console.error(
          "Failed to load organization dashboard:",
          error
        );
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);
  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Organization Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of your organization
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 bg-white rounded-xl border border-slate-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Organization Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Overview of your organization
          </p>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }
  const data = dashboard || {};
  const totalEmployees = data.totalEmployees ?? 0;
  const activeEmployees = data.activeEmployees ?? 0;
  const inactiveEmployees = data.inactiveEmployees ?? 0;
  const pendingInvitations = data.pendingInvitations ?? 0;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Organization Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your organization and team
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Employees"
          value={totalEmployees}
          description="Employees in your organization"
        />
        <StatCard
          icon={UserCheck}
          label="Active Employees"
          value={activeEmployees}
          description="Currently active"
        />
        <StatCard
          icon={UserX}
          label="Inactive Employees"
          value={inactiveEmployees}
          description="Currently inactive"
        />
        <StatCard
          icon={Mail}
          label="Pending Invitations"
          value={pendingInvitations}
          description="Awaiting response"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users size={20} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Employee Overview
              </h2>
              <p className="text-sm text-slate-500">
                Current employee status
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-600">
                  Active
                </span>
                <span className="text-sm font-medium text-slate-900">
                  {activeEmployees}
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{
                    width:
                      totalEmployees > 0
                        ? `${(activeEmployees / totalEmployees) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-600">
                  Inactive
                </span>
                <span className="text-sm font-medium text-slate-900">
                  {inactiveEmployees}
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-400 rounded-full"
                  style={{
                    width:
                      totalEmployees > 0
                        ? `${(inactiveEmployees / totalEmployees) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Activity size={20} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Organization Activity
              </h2>
              <p className="text-sm text-slate-500">
                Recent administrative activity
              </p>
            </div>
          </div>
          <div className="py-8 text-center">
            <p className="text-sm text-slate-400">
              No recent activity
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Organization activity will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrganizationDashboard;