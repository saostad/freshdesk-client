import { writeLog } from "fast-node-logger";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { Locations, Location } from "../typings/location";
import { getData } from "./getData";
import { BaseGetInput } from "../typings/general";

export async function getLocations({
  baseUri,
  token,
  doValidate,
}: BaseGetInput) {
  writeLog(`getLocations()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/locations`;

  const data = await getData<z.infer<typeof Location>>({ uri, token });

  const locations: z.infer<typeof Location>[] = [];
  data.forEach((el) => {
    locations.push(...el["locations"]);
  });

  if (doValidate) {
    validateOrFail({ data: locations, schema: Locations });
  }

  writeLog(`${locations.length} locations downloaded.`, {
    stdout: true,
    level: "info",
  });

  return locations;
}
