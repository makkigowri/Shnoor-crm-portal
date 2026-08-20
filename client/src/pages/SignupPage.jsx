import { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
function SignupPage() {
  const [formData, setFormData] = useState({
    organizationName: "",
    adminName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await authService.registerOrganization(formData);

      setSuccess(response.message);
      navigate("/organization/dashboard");

      // Clear form after successful registration
      setFormData({
        organizationName: "",
        adminName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to create organization";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="w-[500px] border rounded-xl p-8"
      >

        <h2 className="text-3xl font-bold mb-6">
          Create Organization
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
            {success}
          </div>
        )}

        <input
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          placeholder="Organization Name"
          className="w-full border p-3 mb-4"
        />

        <input
          name="adminName"
          value={formData.adminName}
          onChange={handleChange}
          placeholder="Admin Name"
          className="w-full border p-3 mb-4"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-3 mb-4"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-3 mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Organization"}
        </button>

      </form>

    </div>
  );
}

export default SignupPage;