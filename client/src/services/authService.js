import api from "./api";
const registerOrganization = async (organizationData) => {
  const response = await api.post(
    "/auth/register-organization",
    organizationData
  );
  return response.data;
};
const loginUser = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};
const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
const getInvitation = async (token) => {
  const response = await api.get(`/auth/invitation/${token}`);
  return response.data;
};
const acceptInvitation = async ({ token, name, password }) => {
  const response = await api.post("/auth/accept-invitation", {
    token,
    name,
    password,
  });
  return response.data;
};
const authService = {
  registerOrganization,
  loginUser,
  getCurrentUser,
  getInvitation,
  acceptInvitation,
};
export default authService;
