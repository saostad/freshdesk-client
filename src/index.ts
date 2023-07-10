export { getTickets } from "./services/getTickets";
export { getRequesters } from "./services/getRequesters";
export { getDepartments } from "./services/getDepartments";

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
// config();

// const baseUri = process.env.SANDBOX_BASE_URL!;
// const token = process.env.SANDBOX_TOKEN!;

// getTickets({
//   baseUri,
//   token,
//   filter: "status:3 OR status:2",
// }).then((res) => {
//   console.log(`File: index.ts,`, `Line: 24 => `, res);
// });
