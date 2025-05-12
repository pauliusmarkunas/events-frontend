import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email or password")
    .max(100, "Invalid email or password")
    .required("Invalid email or password"),

  password: Yup.string()
    .min(1, "Invalid email or password")
    .required("Invalid email or password"),
});

export default loginSchema;
