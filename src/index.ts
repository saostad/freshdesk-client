import { writeLog } from "fast-node-logger";
import type { NodeMode } from "./typings/node/mode";
import { createLoggerInstance, getCredential } from "./helpers/util";
import { getTickets } from "./services/getTickets";
import { getRequesters } from "./services/getRequesters";
import { getDepartments } from "./services/getDepartments";

import sql from "mssql";
import { getAgents } from "./services/getAgents";
import { getAssets } from "./services/getAssets";
import { getAssetTypes } from "./services/getAssetTypes";
import { getProducts } from "./services/getProducts";
import { getLocations } from "./services/getLocations";

/* place holder for execution time measuring **/
const hrstart = process.hrtime();

process.on("beforeExit", (code) => {
  const hrend = process.hrtime(hrstart);
  console.log(`Execution time ${hrend[0]}s ${hrend[1] / 1000000}ms`);
  console.log(`exiting by code ${code}.`);
});

/** server mode base on process.env.NODE_ENV */
let nodeMode: NodeMode = process.env.NODE_ENV || "production";

if (process.env.NODE_ENV) {
  nodeMode = process.env.NODE_ENV;
}

(async () => {
  await createLoggerInstance(nodeMode);

  const tokenKey = await getCredential("freshdesk_tokenKey");
  const baseUri = "https://kajimausa.freshservice.com";

  const azurePool = new sql.ConnectionPool({
    server: "kusa-sql01.database.windows.net",
    database: "azure-db",
    user: (await getCredential("kii_freshdesk_powerbi")).account,
    password: (await getCredential("kii_freshdesk_powerbi")).password,
    connectionTimeout: 30000,
    options: {
      encrypt: true,
      enableArithAbort: true,
    },
  });

  await azurePool.connect();

  const tickets = await getTickets({ baseUri, token: tokenKey.password });

  const requesters = await getRequesters({ baseUri, token: tokenKey.password });

  const departments = await getDepartments({
    baseUri,
    token: tokenKey.password,
  });

  const agents = await getAgents({ baseUri, token: tokenKey.password });

  const assets = await getAssets({ baseUri, token: tokenKey.password });

  const assetTypes = await getAssetTypes({
    baseUri,
    token: tokenKey.password,
  });

  const products = await getProducts({
    baseUri,
    token: tokenKey.password,
  });

  const locations = await getLocations({
    baseUri,
    token: tokenKey.password,
  });

  await azurePool.close();
})().catch((err) => {
  writeLog([err], { stdout: true, level: "error" });
});
