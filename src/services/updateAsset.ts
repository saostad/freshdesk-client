/**
 * Update an Asset
This operation allows you to update an existing asset.

Attribute	Type	Description
id	number	Unique ID of the asset.
workspace_id	number	Workspace ID of the asset. The attribute is applicable only for accounts with the 'Workspaces' feature enabled.READ ONLY
display_id	numbers	Display ID of the asset.
name	string	Name of the asset.
description	string	Description of the asset.
asset_type_id	number	ID of the asset type.
asset_tag	string	Asset tag of the asset.
impact	string	Impact of the asset.
author_type	string	Indicates whether the asset was created by a user or discovery tools (Probe or Agent).READ ONLY
usage_type	string	Usage type of the asset (Loaner / Permanent).
user_id	number	ID of the associated user (Used By).
location_id	number	ID of the associated location.
department_id	number	ID of the associated department.
agent_id	number	ID of the associated agent (Managed By).
group_id	number	ID of the associated agent group (Managed By Group).
assigned_on	datetime	Date and time when the asset was assigned.
created_at	datetime	Date and time when the asset was created.READ ONLY
updated_at	datetime	Date and time when the asset was updated.READ ONLY
Asset Properties
For the following attributes, the supported values are listed below.

Attribute	Supported Values	Comments
impact	low, medium, high	The default value is “low”
usage_type	permanent, loaner	The default value is “permanent”
PUT  /api/v2/assets/[display_id]

@example
curl -v -u api_key:X -H "Content-Type: application/json" -X PUT -d '{ "name": "Macbook Pro 2","asset_type_id": 25, "asset_tag":"ASSET-9", "impact":"high", "usage_type":"loaner", "description":"13.3-inch (diagonal) LED-backlit glossy widescreen display,1440-by-900 resolution", "location_id":null, "agent_id":null, "department_id":null, "group_id":9, "assigned_on": "2014-07-26T12:25:04+05:30", "type_fields": { "product_25" : 10, "vendor_25" : 14, "cost_25":5000 , "salvage":100, "depreciation_id":30, "warranty_25":20, "acquisition_date_25":"2018-07-26T12:25:04+05:30", "warranty_expiry_date_25":"2018-07-26T12:25:04+05:30", "domain_25":1, "asset_state_25":"In Use", "serial_number_25":"SW12131133", "last_audit_date_25":"2014-07-26T12:25:04+05:30" } }' 'https://domain.freshservice.com/api/v2/assets/11'
 */
