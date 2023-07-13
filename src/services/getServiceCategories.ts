import z from "zod";
import {
  ServiceCategory,
  ServiceCategories as schema,
} from "../typings/service-category";
import { getData } from "./getData";
import { validateOrFail } from "../helpers/util";

type GetServiceCategories = {
  baseUri: string;
  token: string;
  /** set to true to validate api response against the zod schema */
  doValidate?: boolean;
};

/**
 * View List of Service Categories
 * @ref https://api.freshservice.com/v2/#list_all_service_items
 * @description
This api lists all service categories in your Freshservice service desk
* @note
By default, only service categories from the primary workspace will be returned for accounts with the 'Workspaces' feature enabled. For service categories from other workspaces, use the workspace_id filter.

* @note Filter by	Handle
Workspace	/api/v2/service_catalog/categories?workspace_id=[id]
'workspace_id' is applicable only for accounts with the 'Workspaces' feature enabled.
GET  /api/v2/service_catalog/categories
* @example
curl -v -u api_key:X -X GET 'https://domain.freshservice.com/api/v2/service_catalog/categories?workspace_id=2'
 */
export const getServiceCategories = async ({
  baseUri,
  token,
  doValidate,
}: GetServiceCategories) => {
  const response = await getData<z.infer<typeof ServiceCategory>>({
    uri: `${baseUri}/api/v2/service_catalog/categories`,
    token,
  });

  const serviceCategories: z.infer<typeof ServiceCategory>[] =
    response[0].service_categories;

  if (doValidate) {
    validateOrFail({ schema, data: serviceCategories });
  }

  return serviceCategories;
};
