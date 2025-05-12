import client from "./client";

const base = "/stats";
export const getEventsStats = () => client.get(`${base}/events`);
export const getOrganizersStats = () => client.get(`${base}/organizers`);
