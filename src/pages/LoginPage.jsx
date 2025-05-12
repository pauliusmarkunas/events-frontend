import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import loginSchema from "../validations/loginValidation.js";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();
  const loginData = location.state;
  const [formData, setFormData] = useState({
    email: loginData?.email || "",
    password: "",
  });
  const [error, setError] = useState(loginData?.message || "");
  const { setLogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginSchema.validate(formData);

      const result = await setLogin(formData);

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <form noValidate onSubmit={handleLogin}>
          <label htmlFor="email-input" className="block text-m font-medium">
            Email
          </label>
          <input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            type="email"
            id="email-input"
            value={formData.email}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <label htmlFor="password-input" className="block text-m font-medium">
            Password
          </label>
          <input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            id="password-input"
            value={formData.password}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          {error && <div className="message text-center py-4">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
