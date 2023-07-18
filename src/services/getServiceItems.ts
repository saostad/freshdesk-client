import { z } from "zod";
import { BaseGetInput } from "../typings/general";
import {
  ServiceItemOptional,
  ServiceItemsOptional,
} from "../typings/service-item";
import { getData } from "./getData";
import { validateOrFail } from "../helpers/util";
import { writeLog } from "fast-node-logger";

type GetServiceCategories = BaseGetInput &
  (
    | {
        categoryId?: string;
        workspaceId?: never;
      }
    | {
        categoryId?: never;
        workspaceId?: string;
      }
  );

/** 
 * View List of Service Items
This API lists all service items in your Freshservice service desk.

To view items belonging to a particular category, use the filter below

* @note
By default, only service items from the primary workspace will be returned for accounts with the 'Workspaces' feature enabled. For service items from other workspaces, use the workspace_id filter.

Filter By	Handle
Category Id	/api/v2/service_catalog/items?category_id=[category_id]
Workspace	/api/v2/service_catalog/items?workspace_id=[id]
'workspace_id' is applicable only for accounts with the 'Workspaces' feature enabled.
GET  /api/v2/service_catalog/items

* @example
curl -v -u api_key:X -X GET 'https://domain.freshservice.com/api/v2/service_catalog/items?workspace_id=2'
 */
export const getServiceItems = async ({
  baseUri,
  token,
  doValidate,
  categoryId,
  workspaceId,
}: GetServiceCategories) => {
  const url = `${baseUri}/api/v2/service_catalog/items`;

  const response = await getData<z.infer<typeof ServiceItemOptional>>({
    token,
    uri: url,
    params: {
      ...(categoryId && { category_id: categoryId }),
      ...(workspaceId && { workspace_id: workspaceId }),
    },
  });

  const serviceItems: z.infer<typeof ServiceItemsOptional> = [];

  response.forEach((el) => {
    serviceItems.push(...el["service_items"]);
  });

  if (doValidate) {
    validateOrFail({ data: serviceItems, schema: ServiceItemsOptional });
  }

  writeLog(`${serviceItems.length} service items downloaded.`, {
    stdout: true,
    level: "info",
  });

  return serviceItems;
};
