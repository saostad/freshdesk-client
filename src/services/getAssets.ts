import { writeLog } from "fast-node-logger";
import { validateOrFail } from "../helpers/util";
import { Asset, AssetsSchema } from "../typings/asset";
import { getData } from "../helpers/getData";
import { BaseGetInput } from "../typings/general";

type FilterItems = {
  workspaceId?: number;
  asset_type_id: number;
  department_id: number;
  location_id: number;
  asset_state: string;
  user_id: number;
  agent_id: number;
};

type FilterObject = {
  filterKey: keyof FilterItems;
  filterValue: string | number;
  /** @default "AND" */
  operator?: "AND" | "OR";
};

type GetAssetsInput = Omit<BaseGetInput, "perPage"> & {
  include?: ["type_fields" | "trashed"];
  /**
   * Filter Assets
    Use asset attributes to filter your list.

    @note
    1. Filtered results cannot be sorted. By default it is sorted by created_at in descending order.
    2. The query must be URL encoded (see example).
    3. Query can be framed using the name of the asset fields, which can be obtained from Supported Asset Fields section.
    4. Query string must be enclosed between a pair of double quotes and can have up to 512 characters.
    5. Logical operators AND, OR along with parentheses () can be used to group conditions.
    6. Relational operators greater than or equal to :> and less than or equal to :< can be used along with date fields and numeric fields.
    7. Input for date fields should be in UTC Format.
    8. The number of objects returned per page is 30. The total count of the results will be returned along with the result (In the headers).
    9. The maximum number of pages returned is 40.
    10. To filter for fields with no values assigned, use the null keyword.
    11. Please note that any updates made to assets either in Freshservice application or through APIs may take a few minutes to get indexed, after which the updated results will be available through API.
    12. By default, only assets from the primary workspace will be returned for accounts with the 'Workspaces' feature enabled. For assets from other workspaces, use the workspace_id filter.

    @note
    Supported Asset Fields
    | Field         | Type    | Description                                                                 |
    | ------------- | ------- | --------------------------------------------------------------------------- |
    | workspace_id  | number  | Workspace ID of the ticket. The attribute is applicable only for accounts with the 'Workspaces' feature enabled. The value 0 for workspace_id will return assets from all workspaces, with only global level fields. |
    | asset_type_id | integer | ID of the asset type.                                                        |
    | department_id | integer | ID of the department to which the asset belongs.                             |
    | location_id   | integer | ID of the location.                                                          |
    | asset_state   | string  | Status of the asset (Eg. IN USE).                                            |
    | user_id       | integer | ID of the user to whom the asset is assigned.                                 |
    | agent_id      | integer | ID of the agent by whom the asset is managed.                                 |
    | name          | string  | Display name of the asset.                                                   |
    | asset_tag     | string  | Tag that is assigned to the asset.                                            |
    | created_at    | date    | Date (YYYY-MM-DD) when the asset is created. READ ONLY                       |
    | updated_at    | date    | Date (YYYY-MM-DD) when the asset is updated. READ ONLY                       |
    @api GET  /api/v2/assets?filter=[query]
    @note 
    - Deprecation Warning:
    The older filter pattern "query=[query]" will be deprecated by end of June 2022 and would remain backward compatible until then. We recommend you to use the new filter query pattern shown above.
    @example
    1. Get the second page of assets (including asset type specific fields) that are In Stock and created since 2018-08-10.

    " asset_state:'IN STOCK' AND created_at:>'2018-08-10' "

    curl -v -u api_key:X -X GET 'https://domain.freshservice.com/api/v2/assets?include=type_fields&filter="asset_state:%27IN%20STOCK%27%20AND%20created_at:>%272018-08-10%27"&page=2'
    2. Combining search and filter to get the assets that are In Stock and which has the serial number starting with HSN.

    search=" serial_number:'HSN' " and filter=" asset_state:'IN STOCK' "

    curl -v -u api_key:X -X GET 'https://domain.freshservice.com/api/v2/assets?search="serial_number%3A%27HSN%27"&filter="asset_state:%27IN%20STOCK%27"'

   */
  // array of filter items objects
  filters?: Array<FilterObject>;
} & (
    | {
        sort?: {
          orderBy?: "id" | "created_at" | "updated_at";
          orderType?: "asc" | "desc";
        };
        search?: never;
      }
    | {
        sort?: never;

        /**
     * Search Assets
    Use asset attributes to search from your list.
    @ref https://api.freshservice.com/v2/#search_assets
    @note
    1. Search results cannot be sorted. By default it is sorted by created_at in descending order.
    2. The search query must be URL encoded (see example).
    3. Query can be framed using the asset fields, which can be obtained from Supported Asset Fields section.
    4. Search query string must be enclosed between a pair of double quotes.
    5. If the search query string contains apostrophe, it must be escaped (see example).
    6. The number of objects returned per page is 30. The total count of the results will be returned along with the result (In the headers).
    7. Please note that any updates made to assets either in Freshservice application or through APIs may take a few minutes to get indexed, after which the updated results will be available through API.
    @note Supported Asset Fields
    Field	        | Type    |	Description
    --------------|---------|-------------
    name          |	string  | Display name of the asset.
    asset_tag	    | string	| Tag that is assigned to the asset.
    serial_number |	string  |	Serial number.
    @api GET  /api/v2/assets?search=[query]
    @example
    1. curl -v -u api_key:X -X GET 'https://domain.freshservice.com/api/v2/assets?search="name%3A%27dell%27"'
    2. Search assets in trash which has name dell.

    search=" name:'dell' "

    curl -v -u api_key:X -X GET 'https://domain.freshservice.com/api/v2/assets?search="name%3A%27dell%27"&trashed=true'
    3. Search string must be escaped if it contains apostrophe.

    search=" name:'andrea\'s laptop' "

    curl -v -u api_key:X -X GET 'https://domain.freshservice.com/api/v2/assets?search="name%3A%27andrea%5C%27s%20laptop%27"'
    */
        search?: {
          searchKey: "name" | "asset_tag" | "serial_number";
          searchValue: string;
        };
      }
  );

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
  search,
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

  // ignore orderBy and orderType if filters is provided
  if (!(filters && filters.length > 0) && sort?.orderBy) {
    params["order_by"] = sort.orderBy;
  }

  // ignore orderBy and orderType if filters is provided
  if (!(filters && filters.length > 0) && sort?.orderType) {
    params["order_type"] = sort.orderType;
  }

  if (search) {
    const searchQuery = `"${search.searchKey}:'${search.searchValue}'"`;
    params["search"] = searchQuery;
  }

  if (filters && filters.length > 0) {
    const filterItems = filters.map((filterItem, index) => {
      const { filterKey, filterValue, operator = "AND" } = filterItem;

      let filterValueFormatted: string | number = filterItem.filterValue;

      // if value type is number, don't add the single quote
      if (typeof filterValue !== "number") {
        filterValueFormatted = `'${filterValue}'`;
      }

      // don't add the operator for the first filter item
      if (index === 0) {
        return `${filterKey}:${filterValueFormatted}`;
      }

      return ` ${operator} ${filterKey}:${filterValueFormatted}`;
    });

    // when join the filterItems wrap it with double quote
    const filterQuery = `"${filterItems.join("")}"`;

    params["filter"] = filterQuery;
  }

  const data = await getData<Asset[]>({
    uri,
    token,
    // if params is empty object, it will be ignored
    params: Object.keys(params).length > 0 ? params : undefined,
  });

  const assets: Asset[] = [];
  data.forEach((el) => {
    assets.push(...el["assets"]);
  });

  if (doValidate) {
    validateOrFail({ data: assets, schema: AssetsSchema });
  }

  writeLog(`${assets.length} assets downloaded.`, {
    stdout: true,
    level: "info",
  });

  return assets;
}
