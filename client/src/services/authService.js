import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register a new organization and its admin
const registerOrganization = async (organizationData) => {
  const response = await axios.post(
    `${API_URL}/register-organization`,
    organizationData
  );

  return response.data;
};

// Login an existing user
const loginUser = async (loginData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    loginData
  );

  return response.data;
};

// Get currently authenticated user
const getCurrentUser = async (token) => {
  const response = await axios.get(
    `${API_URL}/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const authService = {
  registerOrganization,
  loginUser,
  getCurrentUser,
};

export default authService;