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

// import { config } from "dotenv";
// import { getTickets } from "./services/getTickets";
// import { getServiceCategories } from "./services/getServiceCategories";
// import { getServiceItems } from "./services/getServiceItems";
// config();

// const baseUri = process.env.SANDBOX_BASE_URL!;
// const token = process.env.SANDBOX_TOKEN!;
// const serviceCategoryId = process.env.SANDBOX_SERVICE_CATEGORY_ID!;

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
