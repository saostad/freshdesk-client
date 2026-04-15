import { AxiosRequestConfig } from "axios";
import { axiosWithRetry } from "../helpers/util";
import { InternalBasePutInput } from "../typings/general";

/**
 * @description post data to freshservice api
 */
export async function putData<InputData = any, ReturnData = any>({
  data,
  token,
  uri,
}: InternalBasePutInput<InputData>): Promise<ReturnData> {
  const config: AxiosRequestConfig = {
    method: "put",
    url: uri,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
    auth: { username: token, password: "x" },
    data,
  };

  const apiResponse = await axiosWithRetry<ReturnData>(config);

  return apiResponse.data;
}
