import api from "../../app/request-api";

export interface Evento {
  id: number;
  name: string;
  event_date: string;
  location: string;
  description: string;
}

export async function getEventos(limit = 10, skip = 0): Promise<Evento[]> {
  const res = await api.get(`/events?limit=${limit}&skip=${skip}`);
  return res.data;
}
