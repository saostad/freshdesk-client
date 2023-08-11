import z from "zod";

export const ServiceCategorySchema = z.object({
  /** Unique id of the category */
  id: z.number(),
  /** ID of the workspace to which the service category belongs. The attribute is applicable only for accounts with the 'Workspaces' feature enabled. */
  workspace_id: z.number().optional(),
  /** Name of the service category */
  name: z.string(),
  /** Description of the service category */
  description: z.string(),
  /** The time at which the category was created */
  created_at: z.string(),
  /** The time at which the category was updated */
  updated_at: z.string(),
  /** Number denoting the position of category in service catalog */
  position: z.number(),
});

export type ServiceCategory = z.infer<typeof ServiceCategorySchema>;

export const ServiceCategoriesSchema = z.array(ServiceCategorySchema);
