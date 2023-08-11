import { z } from "zod";

export const LocationSchema = z.object({
  /**number	Unique ID of the location. */
  id: z.number(),
  /**	string	Name of the Location.MANDATORY */
  name: z.string(),
  contact_name: z.string().nullable(),
  email: z.string().nullable(),
  parent_location_id: z.number().nullable(),
  phone: z.string().nullable(),
  /** User ID of the primary contact (must be a user in Freshservice) */
  primary_contact_id: z.number().nullable(),
  address: z.object({
    line1: z.string().nullable(),
    line2: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    zipcode: z.string().nullable(),
  }),
  created_at: z.string(),
  /**	string	Date and time when the location was last updated */
  updated_at: z.string().nullable(),
});

export type Location = z.infer<typeof LocationSchema>;

export const LocationsSchema = z.array(LocationSchema);
