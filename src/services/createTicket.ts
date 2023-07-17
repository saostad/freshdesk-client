import { writeLog } from "fast-node-logger";
import { Ticket, NewTicketInput } from "../typings/ticket";
import { z } from "zod";
import { postData } from "./postData";
import { BaseCreateInput } from "../typings/general";

/** 
Source Type	Value
Email	1
Portal	2
Phone	3
Chat	4
Feedback widget	5
Yammer	6
AWS Cloudwatch	7
Pagerduty	8
Walkup	9
Slack	10
*/
export enum TicketSourceType {
  Email = 1,
  Portal = 2,
  Phone = 3,
  Chat = 4,
  FeedbackWidget = 5,
  Yammer = 6,
  AWSCloudwatch = 7,
  Pagerduty = 8,
  Walkup = 9,
  Slack = 10,
}

/**
 * Status	Value
Open	2
Pending	3
Resolved	4
Closed	5
 */
export enum TicketStatus {
  Open = 2,
  Pending = 3,
  Resolved = 4,
  Closed = 5,
}

/**
 * Priorities	Value
Low	1
Medium	2
High	3
Urgent	4
 */
export enum TicketPriority {
  Low = 1,
  Medium = 2,
  High = 3,
  Urgent = 4,
}

type CreateTicket = BaseCreateInput & {
  ticket: z.infer<typeof NewTicketInput>;
};

/** Create a Ticket
This API helps you to create a new ticket in your service desk.
@ref https://api.freshservice.com/v2/#create_ticket
*/
export async function createTicket({ baseUri, token, ticket }: CreateTicket) {
  writeLog(`createTicket()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/tickets`;

  const data = await postData<
    z.infer<typeof NewTicketInput>,
    z.infer<typeof Ticket>
  >({
    uri,
    token,
    data: ticket,
  });

  writeLog(`ticket created with id: ${data.id}`, {
    stdout: true,
    level: "info",
  });

  return data;
}
