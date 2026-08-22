import api from "./api";
export const getEmployeeProfile = async () => {
  const response = await api.get("/employee/profile");
  return response.data;
};
export const updateEmployeeProfile = async (payload) => {
  const response = await api.put("/employee/profile", payload);
  return response.data;
};
export const getEmployeeDashboard = async () => {
  const response = await api.get("/employee/dashboard");
  return response.data;
};
export const getLeads = async () => {
  const response = await api.get("/employee/leads");
  return response.data;
};
export const createLead = async (payload) => {
  const response = await api.post("/employee/leads", payload);
  return response.data;
};
export const updateLead = async (id, payload) => {
  const response = await api.put(`/employee/leads/${id}`, payload);
  return response.data;
};
export const deleteLead = async (id) => {
  const response = await api.delete(`/employee/leads/${id}`);
  return response.data;
};
export const getCustomers = async () => {
  const response = await api.get("/employee/customers");
  return response.data;
};
export const createCustomer = async (payload) => {
  const response = await api.post("/employee/customers", payload);
  return response.data;
};
export const updateCustomer = async (id, payload) => {
  const response = await api.put(`/employee/customers/${id}`, payload);
  return response.data;
};
export const deleteCustomer = async (id) => {
  const response = await api.delete(`/employee/customers/${id}`);
  return response.data;
};
export const getDeals = async () => {
  const response = await api.get("/employee/deals");
  return response.data;
};
export const createDeal = async (payload) => {
  const response = await api.post("/employee/deals", payload);
  return response.data;
};
export const updateDeal = async (id, payload) => {
  const response = await api.put(`/employee/deals/${id}`, payload);
  return response.data;
};
export const deleteDeal = async (id) => {
  const response = await api.delete(`/employee/deals/${id}`);
  return response.data;
};
export const getTasks = async () => {
  const response = await api.get("/employee/tasks");
  return response.data;
};
export const createTask = async (payload) => {
  const response = await api.post("/employee/tasks", payload);
  return response.data;
};
export const updateTask = async (id, payload) => {
  const response = await api.put(`/employee/tasks/${id}`, payload);
  return response.data;
};
export const deleteTask = async (id) => {
  const response = await api.delete(`/employee/tasks/${id}`);
  return response.data;
};
export const getActivities = async () => {
  const response = await api.get("/employee/activities");
  return response.data;
};
export const createActivity = async (payload) => {
  const response = await api.post("/employee/activities", payload);
  return response.data;
};
export const getNotes = async () => {
  const response = await api.get("/employee/notes");
  return response.data;
};
export const createNote = async (payload) => {
  const response = await api.post("/employee/notes", payload);
  return response.data;
};
export const deleteNote = async (id) => {
  const response = await api.delete(`/employee/notes/${id}`);
  return response.data;
};
export const getNotifications = async () => {
  const response = await api.get("/employee/notifications");
  return response.data;
};
export const markNotificationRead = async (id) => {
  const response = await api.put(`/employee/notifications/${id}/read`);
  return response.data;
};
export const markAllNotificationsRead = async () => {
  const response = await api.put("/employee/notifications/read-all");
  return response.data;
};
