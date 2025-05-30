import api from "../../../app/request-api";

export interface CreateEventParams {
  name: string;
  description: string;
  event_date: string;
  location: string;
  capacity: number;
  status: string;
}

export async function createEvent(params: CreateEventParams, image?: File) {
  const formData = new FormData();
  formData.append("name", params.name);
  formData.append("description", params.description);
  formData.append("event_date", params.event_date);
  formData.append("location", params.location);
  formData.append("capacity", String(params.capacity));
  formData.append("status", params.status);
  if (image) {
    formData.append("image", image);
  }
  const res = await api.post("/event", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
