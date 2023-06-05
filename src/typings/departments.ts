import { z } from "zod";

export const Department = z.object({
  description: z.string().nullable(),
  custom_fields: z.any(),
  id: z.number(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  prime_user_id: z.number().nullable(),
  head_user_id: z.number().nullable(),
  domains: z.array(z.any()),
});

export const Departments = z.array(Department);
