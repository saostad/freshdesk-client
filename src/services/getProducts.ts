import { writeLog } from "fast-node-logger";
import { validateOrFail } from "../helpers/util";
import { Product, ProductsSchema } from "../typings/product";
import { getData } from "../helpers/getData";
import { BaseGetInput } from "../typings/general";

export async function getProducts({
  baseUri,
  token,
  doValidate,
}: BaseGetInput) {
  writeLog(`getProducts()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/products`;

  const data = await getData<Product[]>({
    uri,
    token,
  });

  const products: Product[] = [];
  data.forEach((el) => {
    products.push(...el["products"]);
  });

  if (doValidate) {
    validateOrFail({ data: products, schema: ProductsSchema });
  }

  writeLog(`${products.length} products downloaded.`, {
    stdout: true,
    level: "info",
  });

  return products;
}
