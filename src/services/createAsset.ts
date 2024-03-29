import { z } from "zod";
import { AssetSchema } from "../typings/asset";
import { BaseCreateInput } from "../typings/general";
import { writeLog } from "fast-node-logger";
import { postData } from "../helpers/postData";

type CreateAsset = BaseCreateInput & {
  asset: z.infer<typeof AssetSchema>;
};

/**
 * @ref https://api.freshservice.com/v2/#create_an_asset
 */
export async function createAsset({ baseUri, token, asset }: CreateAsset) {
  const uri = `${baseUri}/api/v2/assets`;

  const data = await postData<
    z.infer<typeof AssetSchema>,
    { asset: z.infer<typeof AssetSchema> }
  >({
    uri,
    token,
    data: asset,
  });

  writeLog(`asset created with id: ${data.asset.id}`, {
    stdout: true,
    level: "info",
  });

  return data.asset;
}
