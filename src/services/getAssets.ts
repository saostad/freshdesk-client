import { writeLog } from "fast-node-logger";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { Asset, Assets } from "../typings/asset";
import { getData } from "./getData";
import { BaseGetInput } from "../typings/general";

type GetAssetsInput = BaseGetInput & {
  include?: ["type_fields" | "trashed"];
  sort?: {
    orderBy?: "id" | "created_at" | "updated_at";
    orderType?: "asc" | "desc";
  };
  filters?: {
    workspaceId?: number;
  };
};

/** 
 * @info get assets 
 * @params
  - Workspace	/api/v2/assets?workspace_id=[id]
  'workspace_id' is applicable only for accounts with 'Workspaces' feature enabled. The value 0 for workspace_id will return assets from all workspaces, with only global level fields.
  - Sort by	Handle
  id, created_at, updated_at	/api/v2/assets?order_by=created_at
  Default order by is created_at.
  asc, desc	/api/v2/assets?order_type=asc
  Default sort order is desc.
  - Embed	Handle
  type_fields	/api/v2/assets?include=type_fields
  Will return all fields that are specific to each asset type. For example, for Hardware Asset Type, including type_fields will return fields such as Product_ID, Vendor_ID, Serial_number, etc.
  trashed	/api/v2/assets?trashed=true
  Will return all the assets that are in trash.
 */

export async function getAssets({
  baseUri,
  token,
  doValidate,
  include,
  filters,
  sort,
}: GetAssetsInput) {
  writeLog(`getAsset()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/assets`;

  const params: Record<string, any> = {};

  if (include?.includes("trashed")) {
    params["trashed"] = true;
  }

  if (include?.includes("type_fields")) {
    params["include"] = "type_fields";
  }

  if (filters?.workspaceId) {
    params["workspace_id"] = filters.workspaceId;
  }

  if (sort?.orderBy) {
    params["order_by"] = sort.orderBy;
  }

  if (sort?.orderType) {
    params["order_type"] = sort.orderType;
  }

  const data = await getData<z.infer<typeof Asset>>({
    uri,
    token,
    // if params is empty object, it will be ignored
    params: Object.keys(params).length > 0 ? params : undefined,
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
