export { getTickets } from "./services/getTickets";
export { getRequesters } from "./services/getRequesters";
export { getDepartments } from "./services/getDepartments";
export { getServiceCategories } from "./services/getServiceCategories";
export { getServiceItems } from "./services/getServiceItems";
export { getAgents } from "./services/getAgents";
export { getAssets } from "./services/getAssets";
export { getAssetTypes } from "./services/getAssetTypes";
export { getProducts } from "./services/getProducts";
export { getLocations } from "./services/getLocations";
export {
  createTicket,
  TicketPriority,
  TicketSourceType,
  TicketStatus,
} from "./services/createTicket";

// comments this section before publishing to npm

import { config } from "dotenv";
import { getTickets } from "./services/getTickets";
import { getServiceCategories } from "./services/getServiceCategories";
import { getServiceItems } from "./services/getServiceItems";
import {
  TicketPriority,
  TicketSourceType,
  TicketStatus,
  createTicket,
} from "./services/createTicket";
import { createServiceItem } from "./services/createServiceItem";
import { getAssets } from "./services/getAssets";
config();

const baseUri = process.env.SANDBOX_BASE_URL!;
const token = process.env.SANDBOX_TOKEN!;
const serviceCategoryId = process.env.SANDBOX_SERVICE_CATEGORY_ID!;

getAssets({
  baseUri,
  token,
  doValidate: false,
  // include: ["type_fields"],
  sort: {
    orderBy: "created_at",
    orderType: "asc",
  },
}).then((res) => {
  console.log(`File: index.ts,`, `Line: 36 => `, res);
});

// createServiceItem({
//   baseUri,
//   token,
//   serviceItem: {
//     name: "Test service item",
//     description: "Test service item description",
//     category_id: Number(serviceCategoryId),
//     visibility: 1,
//     short_description: "Test service item short description",
//   },
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 36 => `, res);
// });

// getServiceItems({
//   baseUri,
//   token,
//   category_id: serviceCategoryId,
//   doValidate: true,
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 36 => `, res);
// });

// getServiceCategories({
//   baseUri,
//   token,
//   doValidate: true,
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 24 => `, res);
// });

// getTickets({
//   baseUri,
//   token,
//   filter: "status:3 OR status:2",
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 24 => `, res);
// });

// createTicket({
//   baseUri,
//   token,
//   ticket: {
//     description: "Test ticket description",
//     subject: "Test ticket subject",
//     type: "Incident",
//     priority: TicketPriority.Urgent,
//     status: TicketStatus.Open,
//     source: TicketSourceType.Email,
//     email: "requester domain email",
//     group_id: 60000000000, // group id to assign ticket to
//   },
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 24 => `, res);
// });
