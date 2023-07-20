# Freshdesk API v2

## Description

This is a simple wrapper for the Freshdesk API v2.

- [Freshdesk API v2](https://api.freshservice.com/v2)
- type safe with TypeScript and Zod
- take care of pagination for you

## Installation

```bash
$ npm install freshdesk-client
```

## Documentation

[Full documentation here.](https://saostad.github.io/freshdesk-client/index.html)

## How to use

```ts
const tokenKey = "FRESHDESK_TOKEN_KEY";
const baseUri = "https://YOUR_DOMAIN.freshservice.com";
```

```ts
import { getTickets } from "freshdesk-client";

const tickets = await getTickets({ baseUri, token: tokenKey });

const ticketsWithFilter = await getTickets({
  baseUri,
  token,
  filter: "status:3 OR status:2",
});
```

```ts
import { getRequesters } from "freshdesk-client";

getRequesters({
  baseUri,
  token: tokenKey,
  doValidate: true,
});
```

```ts
import { getDepartments } from "freshdesk-client";

getDepartments({
  baseUri,
  token: tokenKey,
  doValidate: true,
});
```

```ts
import { getAgents } from "freshdesk-client";

getAgents({
  baseUri,
  token: tokenKey,
  doValidate: true,
});
```

```ts
import { getAssets } from "freshdesk-client";

getAssets({
  baseUri,
  token,
  doValidate: true,
  include: ["type_fields"],
  sort: {
    orderBy: "created_at",
    orderType: "asc",
  },
  filters: [
    {
      filterKey: "asset_type_id",
      filterValue: 10000000000000001,
    },
    {
      filterKey: "asset_type_id",
      filterValue: 10000000000000002,
      operator: "OR",
    },
  ],
});
```

```ts
import { getAssetById } from "freshdesk-client";

getAssetById({
  baseUri,
  token,
  assetId: newAsset,
  doValidate: true,
  include: true,
});
```

```ts
import { createAsset } from "freshdesk-client";

createAsset({
  baseUri,
  token,
  asset: {
    name: "Test asset",
    asset_type_id: Number(servicesAssetTypeId),
  },
});
```

```ts
import { getAssetTypes } from "freshdesk-client";

getAssetTypes({
  baseUri,
  token: tokenKey,
  doValidate: true,
});
```

```ts
import { getProducts } from "freshdesk-client";

getProducts({
  baseUri,
  token: tokenKey,
  doValidate: true,
});
```

```ts
import { getLocations } from "freshdesk-client";

getLocations({
  baseUri,
  token: tokenKey,
  doValidate: true,
});
```

```ts
import { getServiceItems } from "freshdesk-client";

getServiceItems({
  baseUri,
  token,
  doValidate: true,
});
```

```ts
import { getServiceCategories } from "freshdesk-client";

getServiceCategories({
  baseUri,
  token,
  doValidate: true,
});
```

```ts
import { createServiceItem } from "freshdesk-client";

createServiceItem({
  baseUri,
  token,
  serviceItem: {
    name: "Test service item",
    description: "Test service item description",
    category_id: 100000001863,
    visibility: 1,
    short_description: "Test service item short description",
  },
});
```

```ts
import {
  TicketPriority,
  TicketSourceType,
  TicketStatus,
  createTicket,
} from "freshdesk-client";

createTicket({
  baseUri,
  token,
  ticket: {
    description: "Test ticket description",
    subject: "Test ticket subject",
    type: "Incident",
    priority: TicketPriority.Urgent,
    status: TicketStatus.Open,
    source: TicketSourceType.Email,
    email: "requester domain email",
    group_id: 60000000000, // group id to assign ticket to
  },
});
```
