import * as Yup from "yup";

// ✅ Password: 8–30 chars, must contain at least one lowercase letter, one uppercase letter, one number, and one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,30}$/;

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .max(100, "Email must not exceed 100 characters")
    .required("Email is required."),

  password: Yup.string()
    .matches(
      passwordRegex,
      "Password: 8–30 characterss, must contain: lowercase letter, uppercase letter, number, and special character"
    )
    .required("Password is required"),

  firstName: Yup.string()
    .min(1, "First name should have at least 1 letter")
    .max(50, "First name must not exceed 50 characters")
    .required("First name is required."),

  lastName: Yup.string()
    .min(1, "Last name should have at least 1 letter")
    .max(50, "Last name must not exceed 50 characters")
    .required("Last name is required."),
});

export default registerSchema;
