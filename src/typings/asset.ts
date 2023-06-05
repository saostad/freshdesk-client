import { z } from "zod";

const type_fields = z.object({
  product_16000738809: z.number().nullable(),
  vendor_16000738809: z.number().nullable(),
  cost_16000738809: z.number().nullable(),
  warranty_16000738809: z.number().nullable(),
  acquisition_date_16000738809: z.string().nullable(),
  warranty_expiry_date_16000738809: z.string().nullable(),
  domain_16000738809: z.string().nullable(),
  asset_state_16000738809: z.string().nullable(),
  serial_number_16000738809: z.string().nullable(),
  last_audit_date_16000738809: z.string().nullable(),
  os_16000738814: z.string().nullable(),
  os_version_16000738814: z.string().nullable(),
  os_service_pack_16000738814: z.string().nullable(),
  memory_16000738814: z.number().nullable(),
  disk_space_16000738814: z.number().nullable(),
  cpu_speed_16000738814: z.number().nullable(),
  cpu_core_count_16000738814: z.number().nullable(),
  mac_address_16000738814: z.string().nullable(),
  uuid_16000738814: z.string().nullable(),
  hostname_16000738814: z.string().nullable(),
  computer_ip_address_16000738814: z.string().nullable(),
  last_login_by_16000738814: z.string().nullable(),
  procurement_type_16000738831: z.string().nullable(),
  depreciation_id: z.number().nullable(),
  salvage: z.number().nullable(),
});

export const Asset = z.object({
  /** number	Unique ID of the asset. */
  id: z.number(),
  /** 	numbers	Display ID of the asset. */
  display_id: z.number().nullable(),
  /** 	string	Name of the asset.MANDATORY */
  name: z.string(),
  /** 	string	Description of the asset. */
  description: z.string().nullable(),
  /** 	number	ID of the asset type.MANDATORY */
  asset_type_id: z.number(),
  /** 	string	Asset tag of the asset. */
  asset_tag: z.string().nullable(),
  /** 	string	Impact of the asset. */
  impact: z.enum(["low", "medium", "high"]),
  /** 	string	Indicates whether the asset was created by a user or discovery tools (Probe or Agent).READ ONLY */
  author_type: z.string().nullable(),
  /** 	string	Usage type of the asset (Loaner / Permanent). */
  usage_type: z.enum(["permanent", "loaner"]),
  /** 	number	ID of the associated user (Used By). */
  user_id: z.number().nullable(),
  /** 	number	ID of the associated location. */
  location_id: z.number().nullable(),
  /** 	number	ID of the associated department. */
  department_id: z.number().nullable(),
  /** 	number	ID of the associated agent (Managed By). */
  agent_id: z.number().nullable(),
  /** 	number	ID of the associated agent group (Managed By Group). */
  group_id: z.number().nullable(),
  /** 	datetime	Date and time when the asset was assigned. */
  assigned_on: z.string().nullable(),
  /** 	datetime	Date and time when the asset was created.READ ONLY */
  created_at: z.string(),
  /** 	datetime	Date and time when the asset was updated.READ ONLY */
  updated_at: z.string().nullable(),
  /** Will return all fields that are specific to each asset type. For example, for Hardware Asset Type, including type_fields will return fields such as Product_ID, Vendor_ID, Serial_number, etc. */
  type_fields: type_fields.partial(),
});

export const Assets = z.array(Asset);
