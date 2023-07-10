import { writeLog } from "fast-node-logger";
import { Ticket } from "../typings/ticket";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { postData } from "./postData";

// https://api.freshservice.com/v2/#create_ticket
/** Ticket Properties
 * Ticket Properties
Every ticket uses certain fixed numerical values to denote its Status and Priorities. These numerical values along with their meanings are given below.

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

Status	Value
Open	2
Pending	3
Resolved	4
Closed	5

Priorities	Value
Low	1
Medium	2
High	3
Urgent	4
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

export enum TicketStatus {
  Open = 2,
  Pending = 3,
  Resolved = 4,
  Closed = 5,
}

export enum TicketPriority {
  Low = 1,
  Medium = 2,
  High = 3,
  Urgent = 4,
}

/** Create a Ticket
This API helps you to create a new ticket in your service desk.

Attribute	Type	Description
id	number	Unique ID of the ticket.
workspace_id	number	Workspace ID of the ticket. The attribute is applicable only for accounts with the 'Workspaces' feature enabled. The default value is the ID of the primary workspace of the account.
name	string	Name of the requester
requester_id *	number	User ID of the requester. For existing contacts, the requester_id can be passed instead of the requester's email.
email *	string	Email address of the requester. If no contact exists with this email address in Freshservice, it will be added as a new contact.
phone *	string	Phone number of the requester. If no contact exists with this phone number in Freshservice, it will be added as a new contact. If the phone number is set and the email address is not, then the name attribute is mandatory.
subject	string	Subject of the ticket. The default value is null.
type	string	Helps categorize the ticket according to the different kinds of issues your support team deals with. The default Value is incident. * As of now, API v2 supports only type ‘incident’
status *	number	Status of the ticket.
priority *	number	Priority of the ticket.
description	string	HTML content of the ticket.
responder_id	number	ID of the agent to whom the ticket has been assigned
attachments	array of objects	Ticket attachments. The total size of these attachments cannot exceed 40 MB.
cc_emails	array of strings	Email address added in the 'cc' field of the incoming ticket email.
custom_fields	dictionary	Key value pairs containing the names and values of custom fields. Read more here.
due_by	datetime	Timestamp that denotes when the ticket is due to be resolved.
email_config_id	number	ID of email config which is used for this ticket. (i.e., support@yourcompany.com/sales@yourcompany.com)
fr_due_by	datetime	Timestamp that denotes when the first response is due
group_id	number	ID of the group to which the ticket has been assigned. The default value is the ID of the group that is associated with the given email_config_id
source *	number	The channel through which the ticket was created. The default value is 2.
tags	array of strings	Tags that have been associated with the ticket
department_id	number	Department ID of the requester.
category	string	Ticket category
sub_category	string	Ticket sub category
item_category	string	Ticket item category
associate_ci	hash	Search for asset and associate with ticketTO BE DEPRECATED
assets	hash	Assets that have to be associated with the ticket
urgency	number	Ticket urgency
impact	number	Ticket impact
problem	hash	Problem that need to be associated with ticket (problem display id)
change_initiating_ticket	hash	Change causing the ticket that needs to be associated with ticket (change display id)
change_initiated_by_ticket	hash	Change needed for the ticket to be fixed that needs to be associated with ticket (change display id)
* Refer to the Ticket properties table for supported values.
* Any of the five attributes is mandatory. */

type CreateTicket = {
  baseUri: string;
  token: string;
  ticket: {
    name?: string;
    email?: string;
    phone?: string;
    subject: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    source: TicketSourceType;
    group_id: number;
    type: "Incident";
    custom_fields?: {
      [key: string]: string;
    };
  };
};

export async function createTicket({ baseUri, token, ticket }: CreateTicket) {
  writeLog(`createTicket()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/tickets`;

  const data = await postData<z.infer<typeof Ticket>>({
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
