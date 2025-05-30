import api from "../../app/request-api";
import { Evento } from "./eventosService";

export async function buscarEventos(nombre: string, skip = 0, limit = 10): Promise<Evento[]> {
  const res = await api.get(`/events?name_query=${encodeURIComponent(nombre)}&skip=${skip}&limit=${limit}`);
  return res.data;
}
