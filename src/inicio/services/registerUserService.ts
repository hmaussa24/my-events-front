import api from "../../app/request-api";

export interface UserRegister {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  // Puedes agregar más campos según tu modelo
}

export async function registerUser(user: UserRegister): Promise<UserResponse> {
  const response = await api.post("/users", user);
  return response.data;
}
