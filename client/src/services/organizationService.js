import axios from "axios";

const API_URL = "http://localhost:5000/api/organization";
// ============================================================
// DASHBOARD
// ============================================================

export const getOrganizationDashboard = async () => {
  const token = localStorage.getItem("admin_token");

  const response = await axios.get(
    `${API_URL}/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ============================================================
// EMPLOYEES
// ============================================================

export const getOrganizationEmployees = async () => {
  const token = localStorage.getItem("admin_token");

  const response = await axios.get(
    `${API_URL}/employees`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ============================================================
// INVITATIONS
// ============================================================

export const getOrganizationInvitations = async () => {
  const token = localStorage.getItem("admin_token");

  const response = await axios.get(
    `${API_URL}/invitations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const createOrganizationInvitation = async ({
  email,
  role,
}) => {
  const token = localStorage.getItem("admin_token");

  const response = await axios.post(
    `${API_URL}/invitations`,
    {
      email,
      role,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ============================================================
// ORGANIZATION SETTINGS
// ============================================================

export const getOrganizationSettings = async () => {
  const token = localStorage.getItem("admin_token");

  const response = await axios.get(
    `${API_URL}/settings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const updateOrganizationSettings = async (
  name
) => {
  const token = localStorage.getItem("admin_token");

  const response = await axios.put(
    `${API_URL}/settings`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ============================================================
// ORGANIZATION PROFILE
// ============================================================

export const getOrganizationProfile = async () => {
  const token = localStorage.getItem("admin_token");

  const response = await axios.get(
    `${API_URL}/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const updateOrganizationProfile = async (
  name
) => {
  const token = localStorage.getItem("admin_token");

  const response = await axios.put(
    `${API_URL}/profile`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};