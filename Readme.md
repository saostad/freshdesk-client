# Freshdesk API v2

## How to use

```ts
import { getTickets } from "freshdesk-client";
import { getRequesters } from "freshdesk-client";
import { getDepartments } from "freshdesk-client";

import { getAgents } from "freshdesk-client";
import { getAssets } from "freshdesk-client";
import { getAssetTypes } from "freshdesk-client";
import { getProducts } from "freshdesk-client";
import { getLocations } from "freshdesk-client";

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
