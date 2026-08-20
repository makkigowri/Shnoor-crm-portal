import { useState } from "react";
import { Mail, Phone, Building2, Briefcase, MapPin, CalendarDays, UserCircle2 } from "lucide-react";
import { employee } from "../../mock/employee";

function Profile() {
  const [form, setForm] = useState(employee);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const initials = employee.name
    ? employee.name.split(" ").map((n) => n[0]).join("")
    : "";

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center">
        <div className="h-20 w-20 rounded-full bg-blue-600 text-white text-2xl font-semibold flex items-center justify-center">
          {initials || <UserCircle2 size={32} />}
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mt-4">{employee.name || "Not available"}</h2>
        <p className="text-sm text-gray-500">{employee.role || "Not available"}</p>
        <span className="mt-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
          Awaiting account data
        </span>

        <div className="w-full mt-6 space-y-3 text-left">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Mail size={15} className="text-gray-400" /> {employee.email || "Not available"}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Phone size={15} className="text-gray-400" /> {employee.phone || "Not available"}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Building2 size={15} className="text-gray-400" /> {employee.organization || "Not available"}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Briefcase size={15} className="text-gray-400" /> {employee.department || "Not available"}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin size={15} className="text-gray-400" /> {employee.location || "Not available"}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CalendarDays size={15} className="text-gray-400" /> {employee.joinedOn ? `Joined ${employee.joinedOn}` : "Join date not available"}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <UserCircle2 size={18} className="text-blue-600" />
          <h3 className="text-base font-semibold text-gray-900">Profile Settings</h3>
        </div>

        <form className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Role</label>
              <input value={form.role} disabled className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500">Email</label>
              <input value={form.email} disabled className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500">Organization</label>
              <input value={form.organization} disabled className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400" />
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
              <input value={form.reportingTo} disabled className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400" />
            </div>
          </div>

          <div className="pt-2">
            <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Save Changes
            </button>
            <p className="text-xs text-gray-400 mt-2">Profile updates will be saved once account APIs are connected.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
