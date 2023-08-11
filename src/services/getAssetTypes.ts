import { writeLog } from "fast-node-logger";
import { validateOrFail } from "../helpers/util";
import { AssetType, AssetTypesSchema } from "../typings/assetType";
import { getData } from "../helpers/getData";
import { BaseGetInput } from "../typings/general";

export async function getAssetTypes({
  baseUri,
  token,
  doValidate,
}: BaseGetInput) {
  writeLog(`getAssetTypes()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/asset_types`;

  const data = await getData<AssetType[]>({ uri, token });

  const assetsTypes: AssetType[] = [];
  data.forEach((el) => {
    assetsTypes.push(...el["asset_types"]);
  });

  if (doValidate) {
    validateOrFail({ data: assetsTypes, schema: AssetTypesSchema });
  }

  writeLog(`${assetsTypes.length} assetsTypes downloaded.`, {
    stdout: true,
    level: "info",
  });

  return assetsTypes;
}
