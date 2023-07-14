import axios, { AxiosRequestConfig } from "axios";
import { writeLog } from "fast-node-logger";
import { isMoreDataAvailable, getNexLink } from "../helpers/util";

type GetData = {
  /** full endpoint url, including domain, api version and endpoint
   * @example https://domain.freshservice.com/api/v2/tickets
   */
  uri: string;
  token: string;
  /** @info You can request for additional resources using the "include" keyword. For example you can embed the requester's details within the ticket view API by using the following command.
   * @ref for acceptable values refer to [freshservice api documentations](https://api.freshservice.com/#embedding). */
  include?: string;
  /** configurations related to get tickets endpoint  */
  getTicketsConfigs?: {
    /** @info You can filter the tickets using the "filter" keyword.
     * @note url for filter is different from other api calls.
     * @ref for acceptable values refer to [freshservice api documentations](https://api.freshservice.com/v2/#filter_tickets).
     * @endpoint GET  /api/v2/tickets/filter?query=[query]
     * @example "priority:>3%20AND%20group_id:11%20AND%20status:2"
     * @explain Get the list of Urgent and High priority tickets in Open Status belong to the group_id 11 ('priority:3 AND group_id:11 AND status:2')
     */
    filter?: string;
  };
};
export async function getData<T>({
  token,
  uri,
  include,
  getTicketsConfigs,
}: GetData): Promise<Array<Record<string, T[]>>> {
  try {
    writeLog([`getData`, uri], { level: "trace" });

    writeLog(`getting data from ${uri}`, { stdout: true, level: "info" });

    const params: AxiosRequestConfig<any>["params"] = {
      per_page: 100,
      query: getTicketsConfigs?.filter
        ? `"${getTicketsConfigs.filter}"`
        : undefined,
    };

    if (include) {
      params.include = include;
    }

    const config: AxiosRequestConfig = {
      method: "get",
      url: uri,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
      },
      auth: { username: token, password: "x" },
      params,
    };

    const data = [];

    let apiResponse = await axios(config);

    data.push(apiResponse.data);

    while (isMoreDataAvailable(apiResponse)) {
      const nextLinkStr = getNexLink(apiResponse.headers);
      if (nextLinkStr) {
        config.url = nextLinkStr;

        apiResponse = await axios(config).catch((err) => {
          writeLog(`error getting data from api.`, {
            stdout: true,
            level: "error",
          });

          throw err;
        });

        data.push(apiResponse.data);
      }
    }

    return data;
  } catch (error) {
    writeLog(`error while getting data.`, { stdout: true, level: "error" });

    throw error;
  }
}
