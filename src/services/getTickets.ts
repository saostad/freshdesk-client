import { writeLog } from "fast-node-logger";
import { validateOrFail } from "../helpers/util";
import { Ticket, TicketsSchema } from "../typings/ticket";
import { getData } from "../helpers/getData";
import { BaseGetInput } from "../typings/general";

/** get all tickets no filter */
type GetTickets = BaseGetInput & {
  /** @example "priority:>3 AND group_id:11 AND status:2"
   * Get the list of Urgent and High priority tickets in Open Status belong to the group_id 11 ('priority:3 AND group_id:11 AND status:2')
   *
   */
  filter?: string;
};
export async function getTickets({
  baseUri,
  token,
  filter,
  doValidate,
}: GetTickets) {
  writeLog(`getTickets()`, { level: "debug" });

  let uri = `${baseUri}/api/v2/tickets`;

  // if ticket filter is provided
  if (filter) {
    uri = `${baseUri}/api/v2/tickets/filter`;
  }

  const data = await getData<Ticket[]>({
    uri,
    token,
    getTicketsConfigs: { filter },
  });

  const tickets: Ticket[] = [];

  data.forEach((el) => {
    tickets.push(...el["tickets"]);
  });

  if (doValidate) {
    validateOrFail({ data: tickets, schema: TicketsSchema });
  }

  writeLog(`${tickets.length} tickets downloaded.`, {
    stdout: true,
    level: "info",
  });

  return tickets;
}
