import { z } from "zod";

export const Product = z.object({
  /**number	Unique ID of the product. */
  id: z.number(),
  /**	string	Name of the Product.MANDATORY */
  name: z.string(),
  /**	number	ID of the asset type(must be a type in Freshservice) MANDATORY */
  asset_type_id: z.number(),
  /**	string	Manufacturer of the product */
  manufacturer: z.string().nullable(),
  /**	string	Status of the product. */
  status: z.string().nullable(),
  /**	string	Mode of procurement of the product. */
  mode_of_procurement: z.string().nullable(),
  /**	number	ID of the depreciation type. */
  depreciation_type_id: z.number().nullable(),
  /**	string	HTML Content of the product. */
  description: z.string().nullable(),
  /**	string	Description of the product in plain text. */
  description_text: z.string().nullable(),
  /**	string	Date and time when the product was created */
  created_at: z.string(),
  /**	string	Date and time when the product was last updated */
  updated_at: z.string().nullable(),
});

export const Products = z.array(Product);
