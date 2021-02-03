import axios, { AxiosResponse } from "axios";

const API_URL: string = "http://localhost:8080";

const fetchTravelLogList = async (): Promise<AxiosResponse> =>
	await axios.get(`${API_URL}/api/travels`).then((res: any) => res.data);

const createTravelItem = async (entry: any): Promise<AxiosResponse> =>
	await axios
		.post(`${API_URL}/api/travels`, { ...entry })
		.then((res: any) => res.data);

export { fetchTravelLogList, createTravelItem };
