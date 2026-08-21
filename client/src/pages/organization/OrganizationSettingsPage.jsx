import { useEffect, useState } from "react";
import {
  Building2,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import {
  getOrganizationSettings,
  updateOrganizationSettings,
} from "../../services/organizationService";

function OrganizationSettingsPage() {
  const [settings, setSettings] = useState(null);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getOrganizationSettings();

        setSettings(response.data);
        setName(response.data?.name || "");
      } catch (error) {
        console.error(
          "Failed to load organization settings:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load organization settings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Organization name is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await updateOrganizationSettings(
        name.trim()
      );

      setSettings(response.data);
      setName(response.data.name);

      setSuccess(
        response.message ||
          "Organization settings updated successfully."
      );
    } catch (error) {
      console.error(
        "Failed to update organization settings:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to update organization settings."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 w-full">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Organization Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your organization information.
          </p>
        </div>

        <div className="h-72 bg-white rounded-xl border border-slate-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Organization Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your organization information.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle size={18} />
          <span>{success}</span>
        </div>
      )}

      {/* Organization Information */}
      <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Card Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200">
          <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Building2 size={20} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Organization Information
            </h2>

            <p className="text-sm text-slate-500">
              Basic information about your organization.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Organization Name */}
            <div>
              <label
                htmlFor="organization-name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Organization Name
              </label>

              <input
                id="organization-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="w-full max-w-xl px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Status */}
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">
                Organization Status
              </p>

              <span className="inline-flex px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                {settings?.status || "ACTIVE"}
              </span>
            </div>

            {/* Created Date */}
            <div>
              <p className="text-sm font-medium text-slate-700 mb-1">
                Created
              </p>

              <p className="text-sm text-slate-500">
                {settings?.created_at
                  ? new Date(
                      settings.created_at
                    ).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end px-6 py-4 bg-slate-50 border-t border-slate-200 rounded-b-xl">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              <Save size={17} />

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrganizationSettingsPage;