import { z } from "zod";
import { Asset } from "../typings/asset";
import { BaseCreateInput } from "../typings/general";
import { writeLog } from "fast-node-logger";
import { postData } from "./postData";

type CreateAsset = BaseCreateInput & {
  asset: z.infer<typeof Asset>;
};

/**
 * @ref https://api.freshservice.com/v2/#create_an_asset
 */
export async function createAsset({ baseUri, token, asset }: CreateAsset) {
  const uri = `${baseUri}/api/v2/assets`;

  const data = await postData<z.infer<typeof Asset>>({
    uri,
    token,
    data: asset,
  });

  writeLog(`asset created with id: ${data.id}`, {
    stdout: true,
    level: "info",
  });

  return data;
}
