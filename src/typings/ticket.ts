import { z } from "zod";

export const Ticket = z.object({
  subject: z.string(),
  group_id: z.number().nullable(),
  department_id: z.number().nullable(),
  category: z.string().nullable(),
  sub_category: z.string().nullable(),
  item_category: z.string().nullable(),
  requester_id: z.number(),
  responder_id: z.number().nullable(),
  due_by: z.string(),
  fr_escalated: z.boolean(),
  deleted: z.boolean(),
  spam: z.boolean(),
  email_config_id: z.number().nullable(),
  is_escalated: z.boolean(),
  fr_due_by: z.string(),
  id: z.number(),
  priority: z.number(),
  status: z.number(),
  source: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  requested_for_id: z.number(),
  type: z.string(),
  description: z.string(),
  description_text: z.string(),
});

export const Tickets = z.array(Ticket);
