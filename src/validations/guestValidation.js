import * as yup from "yup";

const guestSchema = yup.object().shape({
  eventId: yup
    .number()
    .typeError("Event ID must be a number")
    .integer("Event ID must be an integer")
    .required("Event ID is required"),

  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name should be at least 3 characters long")
    .max(100, "Full name should be at most 100 characters long"),

  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address")
    .max(100, "Email must not exceed 100 characters"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .integer("Age must be an integer")
    .min(0, "Age cannot be less than 0")
    .max(120, "Age cannot be greater than 120")
    .required("Age is required"),

  birthYear: yup
    .number()
    .typeError("Birth year must be a number")
    .integer("Birth year must be an integer")
    .min(1900, "Birth year cannot be earlier than 1900")
    .max(
      new Date().getFullYear(),
      `Birth year cannot be later than ${new Date().getFullYear()}`
    )
    .notRequired(),
});

export default guestSchema;
