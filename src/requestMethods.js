import axios from "axios";

const BASE_URL = "https://crown-shop-backend.vercel.app/api/";

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});
