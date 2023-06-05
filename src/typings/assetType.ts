import { z } from "zod";

export const AssetType = z.object({
  /**number	Unique ID of the asset type. */
  id: z.number(),
  /**	string	Name of the asset type.MANDATORY */
  name: z.string(),
  /**	string	Short description of the asset type. */
  description: z.string().nullable(),
  /**	number	ID of the parent asset type. */
  parent_asset_type_id: z.number().nullable(),
  /**	boolean	Visibility of the default asset type. Set to true if the asset type is visible. Custom asset  types are set to true by default and cannot be modified. */
  visible: z.boolean(),
  /**	datetime	Date and time when the asset type was created */
  created_at: z.string(),
  /**	datetime	Date and time when the asset type was last updated */
  updated_at: z.string(),
});

export const AssetTypes = z.array(AssetType);
