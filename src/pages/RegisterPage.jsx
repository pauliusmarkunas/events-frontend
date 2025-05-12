import { useState } from "react";
import registerSchema from "../validations/registerValidation.js";
import { register } from "../api/authRequests.js";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { passwordRepeat, ...formDataWithoutRepeat } = formData;
    try {
      await registerSchema.validate(formDataWithoutRepeat);

      if (formData.password !== passwordRepeat) {
        return setError("Passwords do not match");
      }

      const result = await register(formDataWithoutRepeat);

      if (result?.error) {
        setError(result.error.message);
      } else {
        setError(null);
        navigate("/login", {
          state: {
            message: "Registration successful. Please log in.",
            email: formData.email,
          },
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <form noValidate onSubmit={handleRegister}>
          <label htmlFor="first-name" className="block text-m font-medium">
            First Name
          </label>
          <input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            type="text"
            id="first-name"
            value={formData.firstName}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <label htmlFor="last-name" className="block text-m font-medium">
            Last Name
          </label>
          <input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            type="text"
            id="last-name"
            value={formData.lastName}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
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
          <label htmlFor="password-repeat" className="block text-m font-medium">
            Repeat Password
          </label>
          <input
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                passwordRepeat: e.target.value,
              }))
            }
            type="password"
            id="password-repeat"
            value={formData.passwordRepeat}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
          {error && <div className="message text-center py-4">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
