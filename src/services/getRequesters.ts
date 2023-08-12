import { writeLog } from "fast-node-logger";
import { validateOrFail } from "../helpers/util";
import { Requester, RequestersSchema } from "../typings/requester";
import { getData } from "../helpers/getData";
import { BaseGetInput } from "../typings/general";

export async function getRequesters({
  baseUri,
  token,
  doValidate,
  perPage,
}: BaseGetInput) {
  writeLog(`getRequesters()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/requesters`;

  const data = await getData<Requester[]>({ uri, token, perPage });

  const requesters: Requester[] = [];
  data.forEach((el) => {
    requesters.push(...el["requesters"]);
  });

  if (doValidate) {
    validateOrFail({ data: requesters, schema: RequestersSchema });
  }

  writeLog(`${requesters.length} requesters downloaded.`, {
    stdout: true,
    level: "info",
  });

  return requesters;
}
