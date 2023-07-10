import { writeLog } from "fast-node-logger";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { Ticket, Tickets } from "../typings/ticket";
import { getData } from "./getData";

/** get all tickets no filter */
type GetTickets = {
  baseUri: string;
  token: string;
  /** @example "priority:>3 AND group_id:11 AND status:2"
   * Get the list of Urgent and High priority tickets in Open Status belong to the group_id 11 ('priority:3 AND group_id:11 AND status:2')
   *
   */
  filter?: string;
};
export async function getTickets({ baseUri, token, filter }: GetTickets) {
  writeLog(`getTickets()`, { level: "debug" });

  let uri = `${baseUri}/api/v2/tickets`;

  // if ticket filter is provided
  if (filter) {
    uri = `${baseUri}/api/v2/tickets/filter`;
  }

  const data = await getData<z.infer<typeof Ticket>>({ uri, token, filter });

  const tickets: z.infer<typeof Ticket>[] = [];

  data.forEach((el) => {
    tickets.push(...el["tickets"]);
  });

  validateOrFail({ data: tickets, schema: Tickets });

  writeLog(`${tickets.length} tickets downloaded.`, {
    stdout: true,
    level: "info",
  });

  return tickets;
}
