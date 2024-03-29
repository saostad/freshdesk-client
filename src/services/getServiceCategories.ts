import {
  ServiceCategory,
  ServiceCategoriesSchema,
} from "../typings/service-category";
import { getData } from "../helpers/getData";
import { validateOrFail } from "../helpers/util";
import { BaseGetInput } from "../typings/general";

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
}: BaseGetInput) => {
  const response = await getData<ServiceCategory[]>({
    uri: `${baseUri}/api/v2/service_catalog/categories`,
    token,
  });

  const serviceCategories: ServiceCategory[] = [];
  response.forEach((el) => {
    serviceCategories.push(...el["service_categories"]);
  });

  if (doValidate) {
    validateOrFail({
      schema: ServiceCategoriesSchema,
      data: serviceCategories,
    });
  }

  return serviceCategories;
};
