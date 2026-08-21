import { useEffect, useState } from "react";
import {
  Users,
  Search,
  UserPlus,
  X,
  Mail,
  Shield,
  CheckCircle,
} from "lucide-react";

import {
  getOrganizationEmployees,
  createOrganizationInvitation,
} from "../../services/organizationService";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Invitation modal
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("SALES_EXECUTIVE");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOrganizationEmployees();

      setEmployees(response.data || []);
    } catch (error) {
      console.error(
        "Failed to load employees:",
        error
      );

      setError("Unable to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const searchValue = search.toLowerCase();

    return (
      employee.name?.toLowerCase().includes(searchValue) ||
      employee.email?.toLowerCase().includes(searchValue)
    );
  });

  const openInviteModal = () => {
    setInviteEmail("");
    setInviteRole("SALES_EXECUTIVE");
    setInviteError("");
    setInviteSuccess("");
    setShowInviteModal(true);
  };

  const closeInviteModal = () => {
    if (inviteLoading) {
      return;
    }

    setShowInviteModal(false);
    setInviteEmail("");
    setInviteRole("SALES_EXECUTIVE");
    setInviteError("");
    setInviteSuccess("");
  };

  const handleInviteSubmit = async (event) => {
    event.preventDefault();

    setInviteError("");
    setInviteSuccess("");

    const email = inviteEmail.trim();

    if (!email) {
      setInviteError("Employee email is required.");
      return;
    }

    if (!email.includes("@")) {
      setInviteError("Please enter a valid email address.");
      return;
    }

    try {
      setInviteLoading(true);

      const response =
        await createOrganizationInvitation({
          email,
          role: inviteRole,
        });

      setInviteSuccess(
        response.message ||
          "Invitation sent successfully."
      );

      setInviteEmail("");
      setInviteRole("SALES_EXECUTIVE");

      // Give the user a moment to see the success message.
      setTimeout(() => {
        setShowInviteModal(false);
        setInviteSuccess("");
      }, 1200);

    } catch (error) {
      console.error(
        "Failed to create invitation:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Unable to send invitation.";

      setInviteError(message);
    } finally {
      setInviteLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Employees
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and manage employees in your organization.
            </p>
          </div>

          <button
            type="button"
            onClick={openInviteModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-sm"
          >
            <UserPlus size={18} />
            Invite Employee
          </button>

        </div>

        {/* Search */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">

          <div className="relative max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Employee table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

          {loading ? (
            <div className="p-10 text-center text-sm text-slate-500">
              Loading employees...
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="p-12 text-center">

              <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                <Users
                  size={22}
                  className="text-slate-400"
                />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                No employees found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Employees added to your organization will appear here.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-slate-50 border-b border-slate-200">

                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Employee
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Role
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Status
                    </th>
                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredEmployees.map((employee) => (

                    <tr
                      key={employee.id}
                      className="hover:bg-slate-50"
                    >

                      <td className="px-6 py-4 font-medium text-slate-900">
                        {employee.name}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {employee.email}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {employee.role}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            employee.status === "ACTIVE"
                              ? "bg-green-50 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {employee.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

      {/* ===================================================== */}
      {/* INVITE EMPLOYEE MODAL */}
      {/* ===================================================== */}

      {showInviteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeInviteModal();
            }
          }}
        >

          {/* Overlay */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

          {/* Modal */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

              <div className="flex items-center gap-3">

                <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Mail size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Invite Employee
                  </h2>

                  <p className="text-xs text-slate-500 mt-0.5">
                    Add a new member to your organization.
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={closeInviteModal}
                disabled={inviteLoading}
                className="h-9 w-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition disabled:opacity-50"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}
            <form onSubmit={handleInviteSubmit}>

              <div className="p-6 space-y-5">

                {/* Success */}
                {inviteSuccess && (
                  <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3.5 text-sm text-green-700">

                    <CheckCircle
                      size={18}
                      className="mt-0.5 shrink-0"
                    />

                    <span>
                      {inviteSuccess}
                    </span>

                  </div>
                )}

                {/* Error */}
                {inviteError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
                    {inviteError}
                  </div>
                )}

                {/* Email */}
                <div>

                  <label
                    htmlFor="invite-email"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Employee email
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="invite-email"
                      type="email"
                      value={inviteEmail}
                      onChange={(event) =>
                        setInviteEmail(event.target.value)
                      }
                      placeholder="employee@company.com"
                      disabled={inviteLoading}
                      autoFocus
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
                    />

                  </div>

                </div>

                {/* Role */}
                <div>

                  <label
                    htmlFor="invite-role"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Employee role
                  </label>

                  <div className="relative">

                    <Shield
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />

                    <select
                      id="invite-role"
                      value={inviteRole}
                      onChange={(event) =>
                        setInviteRole(event.target.value)
                      }
                      disabled={inviteLoading}
                      className="w-full appearance-none pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50"
                    >
                      <option value="SALES_EXECUTIVE">
                        Sales Executive
                      </option>

                      <option value="SALES_MANAGER">
                        Sales Manager
                      </option>

                      <option value="SUPPORT_AGENT">
                        Support Agent
                      </option>
                    </select>

                  </div>

                </div>

                <p className="text-xs text-slate-400">
                  An invitation will be created for this employee.
                </p>

              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl">

                <button
                  type="button"
                  onClick={closeInviteModal}
                  disabled={inviteLoading}
                  className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={inviteLoading}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[145px]"
                >
                  {inviteLoading ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <UserPlus size={17} />
                      Send Invitation
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </>
  );
}

export default EmployeesPage;