import { deleteData } from "../helpers/deleteData";
import { BaseDeleteInput } from "../typings/general";

type DeleteAsset = BaseDeleteInput & {
  displayId: number;
};

/**
Delete an Asset
This operation allows you to delete a particular asset.

@ref https://api.freshservice.com/v2/#delete_an_asset

@api DELETE  /api/v2/assets/[display_id]

@example
curl -v -u api_key:X -X DELETE 'https://domain.freshservice.com/api/v2/assets/9’
Response
HTTP Status: 204 No Content

 */
export async function deleteAsset({ baseUri, token, displayId }: DeleteAsset) {
  const uri = `${baseUri}/api/v2/assets/${displayId}`;

  const data = await deleteData({
    uri,
    token,
  });

  return data;
}
