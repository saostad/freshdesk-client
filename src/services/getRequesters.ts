import { writeLog } from "fast-node-logger";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { Requester, Requesters } from "../typings/requester";
import { getData } from "./getData";

type GetRequesters = { baseUri: string; token: string };
export async function getRequesters({ baseUri, token }: GetRequesters) {
  writeLog(`getRequesters()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/requesters`;

  const data = await getData<z.infer<typeof Requester>>({ uri, token });

  const requesters: z.infer<typeof Requester>[] = [];
  data.forEach((el) => {
    requesters.push(...el["requesters"]);
  });

  validateOrFail({ data: requesters, schema: Requesters });

  writeLog(`${requesters.length} requesters downloaded.`, {
    stdout: true,
    level: "info",
  });

  return requesters;
}
