import { useAuth } from "../context/AuthContext";

function OrganizationDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              CRM Portal
            </h1>

            <p className="text-sm text-gray-500">
              Organization Admin
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.name}
              </p>

              <p className="text-xs text-gray-500">
                {user?.email}
              </p>
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100"
            >
              Logout
            </button>

          </div>

        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Organization Dashboard
          </h2>

          <p className="mt-2 text-gray-600">
            Manage your organization, employees and invitations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white border rounded-xl p-6">
            <p className="text-sm text-gray-500">
              Total Employees
            </p>

            <p className="text-3xl font-bold mt-2">
              --
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <p className="text-sm text-gray-500">
              Active Employees
            </p>

            <p className="text-3xl font-bold mt-2">
              --
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <p className="text-sm text-gray-500">
              Pending Invitations
            </p>

            <p className="text-3xl font-bold mt-2">
              --
            </p>
          </div>

        </div>

        {/* Admin actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold">
              Employees
            </h3>

            <p className="text-gray-500 mt-2">
              View and manage employees in your organization.
            </p>

            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
              Manage Employees
            </button>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold">
              Invitations
            </h3>

            <p className="text-gray-500 mt-2">
              Invite employees and manage pending invitations.
            </p>

            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
              Manage Invitations
            </button>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold">
              Organization
            </h3>

            <p className="text-gray-500 mt-2">
              View and manage your organization settings.
            </p>

            <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg">
              Organization Settings
            </button>
          </div>

        </div>

      </main>

    </div>
  );
}

export default OrganizationDashboard;