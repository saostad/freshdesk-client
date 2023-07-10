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
import { getTickets } from "freshdesk-client";
import { getRequesters } from "freshdesk-client";
import { getDepartments } from "freshdesk-client";
import { getAgents } from "freshdesk-client";
import { getAssets } from "freshdesk-client";
import { getAssetTypes } from "freshdesk-client";
import { getProducts } from "freshdesk-client";
import { getLocations } from "freshdesk-client";
import {
  TicketPriority,
  TicketSourceType,
  TicketStatus,
  createTicket,
} from "freshdesk-client";

const tokenKey = "FRESHDESK_TOKEN_KEY";
const baseUri = "https://YOUR_DOMAIN.freshservice.com";

const tickets = await getTickets({ baseUri, token: tokenKey });

const ticketsWithFilter = await getTickets({
  baseUri,
  token,
  filter: "status:3 OR status:2",
});

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
