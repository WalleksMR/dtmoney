import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.PUBLIC_URL}/api`,
});
