import { writeLog } from "fast-node-logger";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { Locations, Location } from "../typings/location";
import { getData } from "./getData";

type GetLocation = { baseUri: string; token: string };
export async function getLocations({ baseUri, token }: GetLocation) {
  writeLog(`getLocations()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/locations`;

  const data = await getData<z.infer<typeof Location>>({ uri, token });

  const locations: z.infer<typeof Location>[] = [];
  data.forEach((el) => {
    locations.push(...el["locations"]);
  });

  validateOrFail({ data: locations, schema: Locations });

  writeLog(`${locations.length} locations downloaded.`, {
    stdout: true,
    level: "info",
  });

  return locations;
}
