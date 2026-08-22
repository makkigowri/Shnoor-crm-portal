import { useState, useEffect } from "react";
import { Mail, Phone, Building2, Briefcase, MapPin, CalendarDays, UserCircle2 } from "lucide-react";
import { getEmployeeProfile, updateEmployeeProfile } from "../../services/employeeService";
import { useAuth } from "../../context/AuthContext";
function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}
function Profile() {
  const { updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    department: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    let isMounted = true;
    async function loadProfile() {
      try {
        setLoading(true);
        setError("");
        const response = await getEmployeeProfile();
        if (!isMounted) return;
        setProfile(response.data);
        setForm({
          name: response.data.name || "",
          phone: response.data.phone || "",
          department: response.data.department || "",
          location: response.data.location || "",
        });
      } catch (err) {
        if (!isMounted) return;
        setError(err.response?.data?.message || "Unable to load profile");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProfile();
    return () => {
      isMounted = false;
    };
  }, []);
  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccessMessage("");
    try {
      const response = await updateEmployeeProfile(form);
      setProfile(response.data);
      setForm({
        name: response.data.name || "",
        phone: response.data.phone || "",
        department: response.data.department || "",
        location: response.data.location || "",
      });
      updateUser({ name: response.data.name });
      setSuccessMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  }
  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("")
    : "";
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-sm text-gray-500">
        Loading profile...
      </div>
    );
  }
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center">
        <div className="h-20 w-20 rounded-full bg-blue-600 text-white text-2xl font-semibold flex items-center justify-center">
          {initials || <UserCircle2 size={32} />}
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mt-4">{profile?.name || "Not available"}</h2>
        <p className="text-sm text-gray-500">{profile?.role || "Not available"}</p>
        <span className="mt-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200">
          {profile?.status || "ACTIVE"}
        </span>
        <div className="w-full mt-6 space-y-3 text-left">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Mail size={15} className="text-gray-400" /> {profile?.email || "Not available"}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Phone size={15} className="text-gray-400" /> {profile?.phone || "Not available"}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Building2 size={15} className="text-gray-400" /> {profile?.organization_name || "Not available"}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Briefcase size={15} className="text-gray-400" /> {profile?.department || "Not available"}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin size={15} className="text-gray-400" /> {profile?.location || "Not available"}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CalendarDays size={15} className="text-gray-400" /> {profile?.created_at ? `Joined ${formatDate(profile.created_at)}` : "Join date not available"}
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <UserCircle2 size={18} className="text-blue-600" />
          <h3 className="text-base font-semibold text-gray-900">Profile Settings</h3>
        </div>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
            {successMessage}
          </div>
        )}
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Role</label>
              <input value={profile?.role || ""} disabled className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500">Email</label>
              <input value={profile?.email || ""} disabled className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500">Organization</label>
              <input value={profile?.organization_name || ""} disabled className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Department</label>
              <input name="department" value={form.department} onChange={handleChange} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500">Location</label>
              <input name="location" value={form.location} onChange={handleChange} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Reporting To</label>
              <input value="" disabled placeholder="Not available" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400" />
            </div>
          </div>
          <div className="pt-2">
            <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-60">
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <p className="text-xs text-gray-400 mt-2">Name updates are saved to your account. Phone, department, and location are not yet stored in the backend.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Profile;
