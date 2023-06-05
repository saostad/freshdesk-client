import { writeLog } from "fast-node-logger";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { Product, Products } from "../typings/product";
import { getData } from "./getData";

type GetProducts = { baseUri: string; token: string };
export async function getProducts({ baseUri, token }: GetProducts) {
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

  validateOrFail({ data: products, schema: Products });

  writeLog(`${products.length} products downloaded.`, {
    stdout: true,
    level: "info",
  });

  return products;
}
