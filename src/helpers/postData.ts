import axios, { AxiosRequestConfig } from "axios";
import { InternalBasePostInput } from "../typings/general";

/**
 * @description post data to freshservice api
 */
export async function postData<
  InputData extends Record<string, any> = any,
  ReturnData extends Record<string, any> = any,
>({ uri, token, data }: InternalBasePostInput<InputData>): Promise<ReturnData> {
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
