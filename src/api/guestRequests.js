import client from "./client.js";

const base = "/guest";
export const getEventGuests = (eventId) => client.get(`${base}/all/${eventId}`);
export const addGuest = (data) => client.post(`${base}`, data);
export const updateGuest = (id, data) =>
  client.put(`${base}/update/${id}`, data);
export const deleteGuest = (id) => client.put(`${base}/delete/${id}`);
