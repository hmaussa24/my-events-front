import api from "../../../app/request-api";

export interface CreateEventParams {
  name: string;
  description: string;
  event_date: string;
  location: string;
  capacity: number;
  status: string;
}

export async function createEvent(params: CreateEventParams) {
  const res = await api.post("/event", params);
  return res.data;
}

export async function getEventById(id: number) {
  const res = await api.get(`/event/${id}`);
  return res.data;
}

export async function updateEvent(id: number, params: CreateEventParams) {
  const res = await api.patch(`/event/${id}`, params);
  return res.data;
}

export async function deleteEvent(id: number) {
  const res = await api.delete(`/event/${id}`);
  return res.data;
}
