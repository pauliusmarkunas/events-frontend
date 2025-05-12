import * as Yup from "yup";

const eventSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title should be at least 3 characters long")
    .max(100)
    .required("Title is required"),

  description: Yup.string()
    .max(2000, "Description should be at most 2000 characters")
    .nullable()
    .default(""),

  eventDate: Yup.date()
    .required("Event date is required")
    .typeError("Event date must be a valid date"),
});

export default eventSchema;
