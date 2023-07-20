import { validateOrFail } from "../helpers/util";
import { Asset } from "../typings/asset";
import { BaseGetInput } from "../typings/general";
import { getData } from "./getData";

type GetAssetByIdInput = BaseGetInput & {
  /** set to true to include "type_fields" */
  include?: boolean;
  /** @note asset display_id NOT the asset id, these are two different things */
  assetId: number;
};

/**
 * View an Asset
This operation allows you to view a particular asset.
@ref https://api.freshservice.com/v2/#view_an_asset
@note
Use 'include' to embed additional details in the response. Each include will consume an additional API credit.

@note
type_fields	/api/v2/assets/[display_id]?include=type_fields
Will return all fields that are specific to each asset type. For example, for Hardware Asset Type, including type_fields will return fields such as Product_ID, Vendor_ID and Serial_number
GET  /api/v2/assets/[display_id]
@example
curl -v -u api_key:X -X GET 'https://domain.freshservice.com/api/v2/assets/11'

 */
export async function getAssetById({
  baseUri,
  assetId,
  token,
  doValidate,
  include,
}: GetAssetByIdInput) {
  const uri = `${baseUri}/api/v2/assets/${assetId}`;

  // it returns array of assets but we need the first one, then it comes in an object with key "asset" so we need to destructure it
  const [{ asset: assetData }] = await getData({
    uri,
    token,
    include: include ? "type_fields" : undefined,
  });

  if (doValidate) {
    validateOrFail({ data: assetData, schema: Asset });
  }

  return assetData;
}
