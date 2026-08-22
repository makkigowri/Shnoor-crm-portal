import api from "./api";
export const getOrganizationDashboard = async () => {
  const response = await api.get("/organization/dashboard");
  return response.data;
};
export const getOrganizationEmployees = async () => {
  const response = await api.get("/organization/employees");
  return response.data;
};
export const getOrganizationInvitations = async () => {
  const response = await api.get("/organization/invitations");
  return response.data;
};
export const createOrganizationInvitation = async ({ email, role }) => {
  const response = await api.post("/organization/invitations", {
    email,
    role,
  });
  return response.data;
};
export const getOrganizationSettings = async () => {
  const response = await api.get("/organization/settings");
  return response.data;
};
export const updateOrganizationSettings = async (name) => {
  const response = await api.put("/organization/settings", { name });
  return response.data;
};
export const getOrganizationProfile = async () => {
  const response = await api.get("/organization/profile");
  return response.data;
};
export const updateOrganizationProfile = async (name) => {
  const response = await api.put("/organization/profile", { name });
  return response.data;
};
