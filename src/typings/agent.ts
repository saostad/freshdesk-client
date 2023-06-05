import { z } from "zod";

export const Agent = z.object({
  /** number	User ID of the agent. */
  id: z.number(),
  /** string	First name of the agent. MANDATORY */
  first_name: z.string(),
  /** string	Last name of the agent. */
  last_name: z.string().nullable(),
  /** boolean	True if the agent is an occasional agent, and false if full-time agent. */
  occasional: z.boolean(),
  /** string	Job title of the agent. */
  job_title: z.string().nullable(),
  /** string	Email address of the agent. MANDATORY */
  email: z.string(),
  /** number	Work phone number of the agent. */
  work_phone_number: z.string().nullable(),
  /** number	Mobile phone number of the agent. */
  mobile_phone_number: z.string().nullable(),
  /** array of numbers	Unique IDs of the departments associated with the agent */
  department_ids: z.array(z.number()).nullable(),
  /** boolean	Set to true if the agent must be allowed to view tickets filed by other members of the department, and false otherwise */
  can_see_all_tickets_from_associated_departments: z.boolean().nullable(),
  /** number	User ID of the agent's reporting manager. */
  reporting_manager_id: z.number().nullable(),
  /** string	Address of the agent. */
  address: z.string().nullable(),
  /** string	Time zone of the agent. Read more here. */
  time_zone: z.string().nullable(),
  /** string	Time format for the agent.Possible values: 12h (12 hour format) 24h (24 hour format)*/
  time_format: z.string().nullable(),
  /** string	Language used by the agent. The default language is “en” (English). Read more here. */
  language: z.string().nullable(),
  /** number	Unique ID of the location associated with the agent. */
  location_id: z.number().nullable(),
  /** string	Background information of the agent. */
  background_information: z.string().nullable(),
  /** number	Unique ID of the level of the agent in the Arcade. Possible values: 1 (Beginner) 2 (Intermediate) 3 (Professional) 4 (Expert) 5 (Master) 6 (Guru) Use member_of attribute instead.*/
  scoreboard_level_id: z.number().nullable(),
  /** array of numbers	Unique IDs of the groups that the agent is a member of. */
  member_of: z.any(),
  /** array of numbers	Unique IDs of the groups that the agent is an observer of.
Use roles attribute instead. */
  observer_of: z.any(),
  /** array of hashes	Each individual role is a hash MANDATORYin the roles array that contains the attributes. 
 * role_id: Unique ID of the role assigned
assignment_scope: The scope in which the agent can use the permissions granted by this role. Possible values include entire_helpdesk (all plans), member_groups (all plans; in the Forest plan, this also includes groups that the agent is an observer of), specified_groups (Forest only), and assigned_items (all plans)
groups: Unique IDs of Groups in which the permissions granted by the role applies. Mandatory only when the assignment_scope is specified_groups, and should be ignored otherwise.
*/
  roles: z.any(),
  /** timestamp	Timestamp of the agent's last successful login. */
  last_login_at: z.string().nullable(),
  /** timestamp	Timestamp of the agent's recent activity. */
  last_active_at: z.string().nullable(),
  /** datetime	Date and time when the agent was created */
  created_at: z.string().nullable(),
  /** datetime	Date and time when the agent was last updated */
  updated_at: z.string().nullable(),
  /** hash	Key-value pair containing the names and values of the (custom) agent fields. */
  custom_fields: z.any(),
  /** boolean	Set to true if the user has logged in to Freshservice at least once, and false otherwise. */
  has_logged_in: z.boolean().nullable(),
  /** boolean	True if the agent is active, false if the agent has been deactivated. */
  active: z.boolean().nullable(),
});

export const Agents = z.array(Agent);
