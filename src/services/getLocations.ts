import { writeLog } from "fast-node-logger";
import { validateOrFail } from "../helpers/util";
import { LocationsSchema, Location } from "../typings/location";
import { getData } from "../helpers/getData";
import { BaseGetInput } from "../typings/general";

export async function getLocations({
  baseUri,
  token,
  doValidate,
}: BaseGetInput) {
  writeLog(`getLocations()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/locations`;

  const data = await getData<Location[]>({ uri, token });

  const locations: Location[] = [];
  data.forEach((el) => {
    locations.push(...el["locations"]);
  });

  if (doValidate) {
    validateOrFail({ data: locations, schema: LocationsSchema });
  }

  writeLog(`${locations.length} locations downloaded.`, {
    stdout: true,
    level: "info",
  });

  return locations;
}
