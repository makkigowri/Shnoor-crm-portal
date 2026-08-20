import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getOrganizationDashboard = async () => {
  const token = localStorage.getItem("admin_token");

  const response = await axios.get(
    `${API_URL}/organization/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};