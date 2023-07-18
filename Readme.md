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
const requesters = await getRequesters({
  baseUri,
  token: tokenKey,
  doValidate: true,
});
```

```ts
import { getDepartments } from "freshdesk-client";
const departments = await getDepartments({
  baseUri,
  token: tokenKey,
  doValidate: true,
});
```

```ts
import { getAgents } from "freshdesk-client";
const agents = await getAgents({ baseUri, token: tokenKey, doValidate: true });
```

```ts
import { getAssets } from "freshdesk-client";
const assets = await getAssets({ baseUri, token: tokenKey, doValidate: true });
```

```ts
import { getAssetTypes } from "freshdesk-client";
const assetTypes = await getAssetTypes({
  baseUri,
  token: tokenKey,
  doValidate: true,
});
```

```ts
import { getProducts } from "freshdesk-client";
const products = await getProducts({
  baseUri,
  token: tokenKey,
  doValidate: true,
});
```

```ts
import { getLocations } from "freshdesk-client";
const locations = await getLocations({
  baseUri,
  token: tokenKey,
  doValidate: true,
});
```

```ts
import { getServiceItems } from "freshdesk-client";
const serviceItems = await getServiceItems({
  baseUri,
  token,
  doValidate: true,
});
```

```ts
import { getServiceCategories } from "freshdesk-client";
const serviceCategories = await getServiceCategories({
  baseUri,
  token,
  doValidate: true,
});
```

```ts
import { createServiceItem } from "freshdesk-client";
const newServiceItem = await createServiceItem({
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

const ticket = await createTicket({
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
