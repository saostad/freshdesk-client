import { writeLog } from "fast-node-logger";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { Product, Products } from "../typings/product";
import { getData } from "./getData";
import { BaseGetInput } from "../typings/general";

export async function getProducts({
  baseUri,
  token,
  doValidate,
}: BaseGetInput) {
  writeLog(`getProducts()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/products`;

  const data = await getData<z.infer<typeof Product>>({
    uri,
    token,
  });

  const products: z.infer<typeof Product>[] = [];
  data.forEach((el) => {
    products.push(...el["products"]);
  });

  if (doValidate) {
    validateOrFail({ data: products, schema: Products });
  }

  writeLog(`${products.length} products downloaded.`, {
    stdout: true,
    level: "info",
  });

  return products;
}
