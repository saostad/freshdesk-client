import { writeLog } from "fast-node-logger";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { Ticket, Tickets } from "../typings/ticket";
import { getData } from "./getData";

type GetTickets = { baseUri: string; token: string };
export async function getTickets({ baseUri, token }: GetTickets) {
  writeLog(`getTickets()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/tickets`;

  const data = await getData<z.infer<typeof Ticket>>({ uri, token });

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
