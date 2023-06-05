# Freshdesk API v2

## How to use

```ts
import { getTickets } from "./services/getTickets";
import { getRequesters } from "./services/getRequesters";
import { getDepartments } from "./services/getDepartments";

import { getAgents } from "./services/getAgents";
import { getAssets } from "./services/getAssets";
import { getAssetTypes } from "./services/getAssetTypes";
import { getProducts } from "./services/getProducts";
import { getLocations } from "./services/getLocations";

const tokenKey = "FRESHDESK_TOKEN_KEY";
const baseUri = "https://YOUR_DOMAIN.freshservice.com";

const tickets = await getTickets({ baseUri, token: tokenKey });

const requesters = await getRequesters({ baseUri, token: tokenKey });

const departments = await getDepartments({
  baseUri,
  token: tokenKey,
});

const agents = await getAgents({ baseUri, token: tokenKey });

const assets = await getAssets({ baseUri, token: tokenKey });

const assetTypes = await getAssetTypes({
  baseUri,
  token: tokenKey,
});

const products = await getProducts({
  baseUri,
  token: tokenKey,
});

const locations = await getLocations({
  baseUri,
  token: tokenKey,
});
```
