import api from "../../../app/request-api";
import { Evento } from "../../../inicio/services/eventosService";

export interface CreateEventParams {
  name: string;
  description: string;
  event_date: string;
  location: string;
  capacity: number;
  status: string;
}

export interface CreateSessionParams {
  name: string;
  description?: string;
  start_time: Date | string;
  end_time: Date | string;
  capacity: number;
  event_id: number;
  speaker_id: number;
}

export interface Session {
  id: number;
  name: string;
  description?: string;
  start_time: string;
  end_time: string;
  capacity: number;
  event_id: number;
  speaker_id: number;
}

export async function createEvent(params: CreateEventParams, image?: File) {
    const formData = new FormData();
    Object.entries(params).forEach(([key, value]) => {
        formData.append(key, String(value));
    });
    if (image) {
        formData.append("image", image);
    }
    const res = await api.post("/event", formData);
    return res.data;
}

export async function getEventosByUser(limit = 10, skip = 0): Promise<Evento[]> {
  const res = await api.get(`/events?limit=${limit}&skip=${skip}`);
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

export async function createSession(params: CreateSessionParams) {
  const res = await api.post("/session", params);
  return res.data;
}

export async function getSessions(eventId: number, skip = 0, limit = 100): Promise<Session[]> {
  const res = await api.get(`/sessions/${eventId}?skip=${skip}&limit=${limit}`);
  return res.data;
}
