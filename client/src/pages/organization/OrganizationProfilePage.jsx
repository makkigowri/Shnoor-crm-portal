import { useEffect, useState } from "react";
import {
  UserCircle,
  Mail,
  Shield,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  getOrganizationProfile,
  updateOrganizationProfile,
} from "../../services/organizationService";
function OrganizationProfilePage() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getOrganizationProfile();
        setProfile(response.data);
        setName(response.data?.name || "");
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );
        setError(
          error.response?.data?.message ||
            "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    try {
      setSaving(true);
      const response = await updateOrganizationProfile(
        name.trim()
      );
      setProfile(response.data);
      setName(response.data.name);
      setSuccess(
        response.message ||
          "Profile updated successfully."
      );
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );
      setError(
        error.response?.data?.message ||
          "Unable to update profile."
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
            Profile
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your administrator profile.
          </p>
        </div>
        <div className="h-72 bg-white rounded-xl border border-slate-200 animate-pulse" />
      </div>
    );
  }
  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your administrator profile.
        </p>
      </div>
      {error && (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle size={18} />
          <span>{success}</span>
        </div>
      )}
      <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200">
          <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <UserCircle size={21} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Administrator Profile
            </h2>
            <p className="text-sm text-slate-500">
              Your account information.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <label
                htmlFor="profile-name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="w-full max-w-xl px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="profile-email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative max-w-xl">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="profile-email"
                  type="email"
                  value={profile?.email || ""}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-400">
                Email address cannot be changed here.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Role
              </label>
              <div className="flex items-center gap-2">
                <Shield
                  size={17}
                  className="text-blue-600"
                />
                <span className="text-sm font-medium text-slate-700">
                  {profile?.role || "ORG_ADMIN"}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">
                Account Status
              </p>
              <span className="inline-flex px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                {profile?.status || "ACTIVE"}
              </span>
            </div>
          </div>
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

export default OrganizationProfilePage;