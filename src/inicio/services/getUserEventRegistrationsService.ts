import api from "../../app/request-api";

export interface RegistrationResponse {
  id: number;
  user_id: number;
  event_id: number;
  registered_at: string;
}

export async function getUserEventRegistrations(): Promise<RegistrationResponse[]> {
  const response = await api.get("/user/registrations");
  return response.data;
}
