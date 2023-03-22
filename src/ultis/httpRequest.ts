import axios from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVICE_URL,
});

export const post = async (path: string, options: any = {}): Promise<any> => {
  const response = await httpRequest.post(path, options);
  return response.data;
};

export default httpRequest;
