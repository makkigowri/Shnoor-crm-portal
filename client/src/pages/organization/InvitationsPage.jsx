import { useEffect, useState } from "react";
import {
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

import {
  getOrganizationInvitations,
} from "../../services/organizationService";


function StatusBadge({ status }) {

  const styles = {
    PENDING:
      "bg-amber-50 text-amber-700 border-amber-200",

    ACCEPTED:
      "bg-green-50 text-green-700 border-green-200",

    EXPIRED:
      "bg-slate-100 text-slate-600 border-slate-200",

    CANCELLED:
      "bg-red-50 text-red-700 border-red-200",
  };


  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${
        styles[status] ||
        "bg-slate-100 text-slate-600 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}


function InvitationsPage() {

  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const loadInvitations = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await getOrganizationInvitations();

      setInvitations(response.data || []);

    } catch (error) {

      console.error(
        "Failed to load invitations:",
        error
      );

      setError(
        "Unable to load invitations."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadInvitations();
  }, []);


  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h1 className="text-2xl font-bold text-slate-900">
            Invitations
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Invite employees and manage pending invitations.
          </p>

        </div>


        <button
          onClick={loadInvitations}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          <RefreshCw size={17} />

          Refresh
        </button>

      </div>


      {/* Error */}

      {error && (

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>

      )}


      {/* Loading */}

      {loading ? (

        <div className="bg-white rounded-xl border border-slate-200 p-6">

          <div className="space-y-4">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="h-16 rounded-lg bg-slate-100 animate-pulse"
              />

            ))}

          </div>

        </div>

      ) : invitations.length === 0 ? (

        /* Empty state */

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">

          <div className="mx-auto h-14 w-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">

            <Mail size={26} />

          </div>


          <h2 className="mt-4 text-base font-semibold text-slate-900">
            No invitations yet
          </h2>


          <p className="mt-1 text-sm text-slate-500">
            Invitations sent to employees will appear here.
          </p>

        </div>

      ) : (

        /* Invitation table */

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-slate-50 border-b border-slate-200">

                <tr>

                  <th className="text-left px-6 py-4 font-medium text-slate-600">
                    Employee
                  </th>

                  <th className="text-left px-6 py-4 font-medium text-slate-600">
                    Role
                  </th>

                  <th className="text-left px-6 py-4 font-medium text-slate-600">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 font-medium text-slate-600">
                    Expires
                  </th>

                  <th className="text-left px-6 py-4 font-medium text-slate-600">
                    Invited By
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-slate-100">

                {invitations.map((invitation) => (

                  <tr
                    key={invitation.id}
                    className="hover:bg-slate-50 transition"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="h-9 w-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">

                          <Mail size={17} />

                        </div>

                        <span className="font-medium text-slate-900">
                          {invitation.email}
                        </span>

                      </div>

                    </td>


                    <td className="px-6 py-4 text-slate-600">
                      {invitation.role
                        ?.replaceAll("_", " ")}
                    </td>


                    <td className="px-6 py-4">
                      <StatusBadge
                        status={invitation.status}
                      />
                    </td>


                    <td className="px-6 py-4 text-slate-600">

                      <div className="flex items-center gap-2">

                        <Clock size={15} />

                        {new Date(
                          invitation.expires_at
                        ).toLocaleDateString()}

                      </div>

                    </td>


                    <td className="px-6 py-4 text-slate-600">
                      {invitation.invited_by_name ||
                        "Organization Admin"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}


export default InvitationsPage;