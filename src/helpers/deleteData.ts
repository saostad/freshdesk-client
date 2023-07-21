import axios, { AxiosRequestConfig } from "axios";
import { InternalBaseDeleteInput } from "../typings/general";

export async function deleteData({
  token,
  uri,
}: InternalBaseDeleteInput): Promise<void> {
  const config: AxiosRequestConfig = {
    method: "delete",
    url: uri,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
    auth: { username: token, password: "x" },
  };

  const apiResponse = await axios(config);

  return apiResponse.data;
}
