import { writeLog } from "fast-node-logger";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { Asset, Assets } from "../typings/asset";
import { getData } from "./getData";
import { BaseGetInput } from "../typings/general";

export async function getAssets({ baseUri, token, doValidate }: BaseGetInput) {
  writeLog(`getAsset()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/assets`;

  const data = await getData<z.infer<typeof Asset>>({
    uri,
    token,
    include: "type_fields",
  });

  const assets: z.infer<typeof Assets> = [];
  data.forEach((el) => {
    assets.push(...el["assets"]);
  });

  if (doValidate) {
    validateOrFail({ data: assets, schema: Assets });
  }

  writeLog(`${assets.length} assets downloaded.`, {
    stdout: true,
    level: "info",
  });

  return assets;
}
