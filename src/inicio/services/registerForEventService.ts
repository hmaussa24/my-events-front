import axios from "axios";
import api from "../../app/request-api";

export interface RegistrationResponse {
  id: number;
  user_id: number;
  event_id: number;
  registered_at: string;
  // Puedes agregar más campos según tu modelo
}

export async function registerForEvent(eventId: number): Promise<RegistrationResponse> {
  const response = await api.post(`/event/${eventId}/register`);
  return response.data;
}
