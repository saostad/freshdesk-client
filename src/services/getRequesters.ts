import { writeLog } from "fast-node-logger";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { Requester, Requesters } from "../typings/requester";
import { getData } from "./getData";
import { BaseGetInput } from "../typings/general";

export async function getRequesters({
  baseUri,
  token,
  doValidate,
}: BaseGetInput) {
  writeLog(`getRequesters()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/requesters`;

  const data = await getData<z.infer<typeof Requester>>({ uri, token });

  const requesters: z.infer<typeof Requester>[] = [];
  data.forEach((el) => {
    requesters.push(...el["requesters"]);
  });

  if (doValidate) {
    validateOrFail({ data: requesters, schema: Requesters });
  }

  writeLog(`${requesters.length} requesters downloaded.`, {
    stdout: true,
    level: "info",
  });

  return requesters;
}
