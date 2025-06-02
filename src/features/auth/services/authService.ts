import axios from "axios";

export const loginApi = async (data: { username: string; password: string }) => {
  return axios.post("http://localhost:8000/api/v1/login/access-token", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const fetchUserApi = () => {
  return axios.get("http://localhost:8000/api/v1/users/me", {
    withCredentials: true,
  });
};

export const logoutApi = () => {
  return axios.post(
    "http://localhost:8000/api/v1/logout",
    {},
    {
      withCredentials: true,
    }
  );
};
