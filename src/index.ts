export { getTickets } from "./services/getTickets";
export { getRequesters } from "./services/getRequesters";
export { getDepartments } from "./services/getDepartments";
export { getServiceCategories } from "./services/getServiceCategories";
export { getServiceItems } from "./services/getServiceItems";
export { getAgents } from "./services/getAgents";
export { getProducts } from "./services/getProducts";
export { getLocations } from "./services/getLocations";
export {
  createTicket,
  TicketPriority,
  TicketSourceType,
  TicketStatus,
} from "./services/createTicket";
export { getAssets } from "./services/getAssets";
export { getAssetTypes } from "./services/getAssetTypes";
export { createAsset } from "./services/createAsset";
export { getAssetById } from "./services/getAssetById";
export { updateAsset } from "./services/updateAsset";
export { deleteAsset } from "./services/deleteAsset";

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
import { getAssetTypes } from "./services/getAssetTypes";
import { createAsset } from "./services/createAsset";
import { getAssetById } from "./services/getAssetById";
import { updateAsset } from "./services/updateAsset";
import { deleteAsset } from "./services/deleteAsset";
config();

const baseUri = process.env.PROD_BASE_URL!;
const token = process.env.SANDBOX_TOKEN!;
const serviceCategoryId = process.env.SANDBOX_SERVICE_CATEGORY_ID!;
const servicesAssetTypeId = process.env.SANDBOX_SERVICES_ASSET_TYPE_ID!;

// deleteAsset({
//   baseUri,
//   token,
//   displayId: 30,
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 36 => `, res);
// });

// updateAsset({
//   baseUri,
//   token,
//   displayId: 30,
//   asset: {
//     name: "Test asset update",
//   },
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 36 => `, res);
// });

// createAsset({
//   baseUri,
//   token,
//   asset: {
//     name: "Test asset",
//     asset_type_id: Number(servicesAssetTypeId),
//   },
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 36 => `, res);
// });

// const newAsset = 28;

// getAssetById({
//   baseUri,
//   token,
//   assetId: newAsset,
//   doValidate: true,
//   include: true,
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 36 => `, res);
// });

// getAssets({
//   baseUri,
//   token,
//   doValidate: true,
//   include: ["type_fields"],
//   sort: {
//     orderBy: "created_at",
//     orderType: "asc",
//   },
//   // filters: [
//   //   {
//   //     filterKey: "asset_type_id",
//   //     filterValue: Number(servicesAssetTypeId),
//   //   },
//   // ],
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 36 => `, res);
// });

getAssetTypes({
  baseUri,
  token,
  doValidate: true,
}).then((res) => {
  console.log(`File: index.ts,`, `Line: 36 => `, res);
});

// createServiceItem({
//   baseUri,
//   token,
//   serviceItem: {
//     name: "Test service item 3",
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
//     email: "notification@kajimausa.com",
//     group_id: 100000112850, // group id to assign ticket to
//   },
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 24 => `, res);
// });
