import { writeLog } from "fast-node-logger";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { AssetType, AssetTypes } from "../typings/assetType";
import { getData } from "./getData";

type GetAssetTypes = { baseUri: string; token: string };
export async function getAssetTypes({ baseUri, token }: GetAssetTypes) {
  writeLog(`getAssetTypes()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/asset_types`;

  const data = await getData<z.infer<typeof AssetType>>({ uri, token });

  const assetsTypes: z.infer<typeof AssetType>[] = [];
  data.forEach((el) => {
    assetsTypes.push(...el["asset_types"]);
  });

  validateOrFail({ data: assetsTypes, schema: AssetTypes });

  writeLog(`${assetsTypes.length} assetsTypes downloaded.`, {
    stdout: true,
    level: "info",
  });

  return assetsTypes;
}
