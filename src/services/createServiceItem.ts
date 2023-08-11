import { writeLog } from "fast-node-logger";
import { postData } from "../helpers/postData";
import { z } from "zod";
import { ServiceItemSchema } from "../typings/service-item";
import { BaseCreateInput } from "../typings/general";

type CreateServiceItem = BaseCreateInput & {
  serviceItem: z.infer<typeof ServiceItemSchema>;
};

/**
 * Create Service Catalog item. This operation allows you to create a new service item in Freshservice.
 * @ref https://api.freshservice.com/v2/#create_service_catalog_item
 */
export async function createServiceItem({
  baseUri,
  token,
  serviceItem,
}: CreateServiceItem) {
  writeLog(`createServiceItem()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/service-catalog/items`;

  const data = await postData<
    z.infer<typeof ServiceItemSchema>,
    { service_item: z.infer<typeof ServiceItemSchema> }
  >({
    uri,
    token,
    data: serviceItem,
  });

  writeLog(`service item created with id: ${data.service_item.id}`, {
    stdout: true,
    level: "info",
  });

  return data.service_item;
}
