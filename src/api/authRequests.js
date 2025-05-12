import client from "./client.js";

const base = "/auth";
export const register = (data) => client.post(`${base}/register`, data);
export const login = (data) => client.post(`${base}/login`, data);
export const getMe = () => client.get(`${base}/me`);
