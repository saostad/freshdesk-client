import { z } from "zod";

export const RequesterSchema = z.object({
  active: z.boolean(),
  address: z.string().nullable(),
  background_information: z.string().nullable(),
  can_see_all_tickets_from_associated_departments: z.boolean(),
  created_at: z.string(),
  custom_fields: z.any(),
  department_ids: z.array(z.any()),
  external_id: z.string().nullable(),
  first_name: z.string(),
  has_logged_in: z.boolean(),
  id: z.number(),
  is_agent: z.boolean(),
  job_title: z.string().nullable(),
  language: z.string(),
  last_name: z.string().nullable(),
  location_id: z.number().nullable(),
  mobile_phone_number: z.string().nullable(),
  primary_email: z.string().nullable(),
  reporting_manager_id: z.number().nullable(),
  secondary_emails: z.array(z.any()),
  time_format: z.string(),
  time_zone: z.string(),
  updated_at: z.string(),
  vip_user: z.boolean(),
  work_phone_number: z.string().nullable(),
});

export type Requester = z.infer<typeof RequesterSchema>;

export const RequestersSchema = z.array(RequesterSchema);
