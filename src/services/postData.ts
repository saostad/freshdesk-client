import axios, { AxiosRequestConfig } from "axios";

export async function postData<T>({
  uri,
  token,
  data,
}: {
  uri: string;
  token: string;
  data: any;
}): Promise<T> {
  const config: AxiosRequestConfig = {
    method: "post",
    url: uri,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
    auth: { username: token, password: "x" },
    data,
  };

  const apiResponse = await axios(config);

  return apiResponse.data;
}
