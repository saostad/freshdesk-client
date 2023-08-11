import z from "zod";

// z schema with descriptions for each field from the Freshservice API docs as jsdoc comments
export const ServiceItemSchema = z.object({
  /** Unique id of the item */
  id: z.number().optional(),
  /** The time at which the item was created */
  created_at: z.string().optional().nullable(),
  /** The time at which the item was update */
  updated_at: z.string().optional().nullable(),
  /** Name of the item */
  name: z.string(),
  /** Estimated delivery time of the item (in hours) */
  delivery_time: z.number().optional().nullable(),
  /** Unique ID of the service item specific to your account */
  display_id: z.number().optional(),
  /** ID of the workspace to which the service item belongs. The attribute is applicable only for accounts with the 'Workspaces' feature enabled. */
  workspace_id: z.number().optional(),
  /** Unique ID of the category of the service item */
  category_id: z.number(),
  /** The ID of the product mapped to the item. Returns null if no product is mapped */
  product_id: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  /** Set to True if the item is deleted */
  deleted: z.boolean().optional(),
  /** 1 denotes visibility to all requesters. 2 for restricted visibility */
  group_visibility: z.number().optional(),
  /** ‘1’ indicates a normal item. ‘2’ indicates a loaner item */
  item_type: z.number().optional(),
  /** Unique id of the asset type associated with the product */
  ci_type_id: z.number().optional().nullable(),
  /** Set to True if cost should be visible to the requester */
  cost_visibility: z.boolean().optional().nullable(),
  /** Set to True if delivery time of the item should be visible to the requester */
  delivery_time_visibility: z.boolean().optional().nullable(),
  /** Config indicating the template of the service request subject */
  configs: z.record(z.any()).optional().nullable(),
  /** Set to True if item is “bot ready” */
  botified: z.boolean().optional(),
  /** ‘1’ denotes draft and ‘2’ denotes published. */
  visibility: z.number(),
  /** Set to True if requester is allowed to attach a file */
  allow_attachments: z.boolean().optional(),
  /** Set as True to allow the requester to request for more than 1 quantity */
  allow_quantity: z.boolean().optional().nullable(),
  /** Boolean indicating whether the item contains child items */
  is_bundle: z.boolean().optional(),
  /** Boolean indicating whether child items will be created as separate service request */
  create_child: z.boolean().optional(),
  /** Description of the service item */
  description: z.string(),
  /** Short Description of the service item */
  short_description: z.string(),
  /** Cost of the service item */
  cost: z.number().optional(),
  /** Custom fields associated with the service item */
  custom_fields: z.string().optional(),
  /** Child Service Items attached to this item */
  child_items: z.string().optional(),
});

export type ServiceItem = z.infer<typeof ServiceItemSchema>;

export const ServiceItemsSchema = z.array(ServiceItemSchema);

export const ServiceItemsOptionalSchema = z.array(ServiceItemSchema.partial());
