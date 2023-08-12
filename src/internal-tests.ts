import { config } from "dotenv";
import {
  TicketPriority,
  TicketSourceType,
  TicketStatus,
  createAsset,
  createServiceItem,
  createTicket,
  deleteAsset,
  getAssetById,
  getAssetTypes,
  getAssets,
  getRequesters,
  getServiceCategories,
  getServiceItems,
  getTickets,
  updateAsset,
} from ".";
import { getRequesterById } from "./services/getRequesterById";
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

// const newAssetId = 28;

// getAssetById({
//   baseUri,
//   token,
//   assetId: 1965,
//   doValidate: true,
//   include: true,
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 36 => `, res);
// });

// getRequesterById({
//   baseUri,
//   token,
//   requesterId: 16002051992,
//   doValidate: true,
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 75 => `, res);
// });

// getRequesters({
//   baseUri,
//   token,
//   doValidate: true,
//   perPage: 100,
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 74 => `, res);
// });

getAssets({
  baseUri,
  token,
  doValidate: true,
  include: ["type_fields"],
  // sort: {
  //   orderBy: "created_at",
  //   orderType: "asc",
  // },
  search: {
    searchKey: "serial_number",
    searchValue: "PF4FCVBY",
  },
  // filters: [
  //   {
  //     filterKey: "asset_type_id",
  //     filterValue: 16000738831,
  //   },
  // ],
}).then((res) => {
  console.log(`File: index.ts,`, `Line: 36 => `, res.length);
});

// getAssetTypes({
//   baseUri,
//   token,
//   doValidate: true,
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 36 => `, res);
// });

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
//   categoryId: serviceCategoryId,
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
