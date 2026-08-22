import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AcceptInvitationPage from "../pages/AcceptInvitationPage";
import OrganizationLayout from "../components/organization/OrganizationLayout";
import OrganizationDashboard from "../pages/organization/OrganizationDashboard";
import EmployeesPage from "../pages/organization/EmployeesPage";
import InvitationsPage from "../pages/organization/InvitationsPage";
import OrganizationSettingsPage from "../pages/organization/OrganizationSettingsPage";
import OrganizationProfilePage from "../pages/organization/OrganizationProfilePage";
import ProtectedRoute from "../components/ProtectedRoute";
import EmployeeLayout from "../components/employee/EmployeeLayout";
import DashboardHome from "../pages/employee/DashboardHome";
import Leads from "../pages/employee/Leads";
import Customers from "../pages/employee/Customers";
import Deals from "../pages/employee/Deals";
import Tasks from "../pages/employee/Tasks";
import Activities from "../pages/employee/Activities";
import Notes from "../pages/employee/Notes";
import Notifications from "../pages/employee/Notifications";
import Profile from "../pages/employee/Profile";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/accept-invitation/:token" element={<AcceptInvitationPage />} />
        <Route path="/organization" element={
            <ProtectedRoute allowedRoles={["ORG_ADMIN"]}>
              <OrganizationLayout />
            </ProtectedRoute>
          }>
            <Route index element={<OrganizationDashboard />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="invitations" element={<InvitationsPage />} />
            <Route path="settings" element={<OrganizationSettingsPage />} />
            <Route path="profile" element={<OrganizationProfilePage />} />
        </Route>
        <Route path="/employee" element={
            <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
              <EmployeeLayout />
            </ProtectedRoute>
          }>
          <Route index element={<DashboardHome />} />
          <Route path="leads" element={<Leads />} />
          <Route path="customers" element={<Customers />} />
          <Route path="deals" element={<Deals />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="activities" element={<Activities />} />
          <Route path="notes" element={<Notes />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;