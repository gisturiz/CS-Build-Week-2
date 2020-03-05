import axios from "axios";

export const axiosWithAuth = () => {
  const token = process.env.TOKEN;
  return axios.create({
    headers: {
      Authorization: `Token ${token}`
    }
  });
};