import client from "./client.js";

const base = "/event";
export const addEvent = (data) => client.post(`${base}/`, data);
export const getAllEvents = () => client.get(`${base}/all`);
export const updateEvent = (id, data) =>
  client.put(`${base}/update/${id}`, data);
export const deleteEvent = (id) => client.put(`${base}/delete/${id}`);
