export type InternalBaseInput = {
  /** full endpoint url, including domain, api version and endpoint
   * @example https://domain.freshservice.com/api/v2/tickets
   */
  uri: string;
  /** Freshdesk api key */
  token: string;
};

export type InternalBaseGetInput = InternalBaseInput & {
  /** @info You can request for additional resources using the "include" keyword. For example you can embed the requester's details within the ticket view API by using the following command.
   * @ref for acceptable values refer to [freshservice api documentations](https://api.freshservice.com/#embedding). */
  include?: string;
  /** query parameters */
  params?: Record<string, string>;
};

export type BaseGetInput = {
  /** base freshdesk url
   * @example https://domain.freshservice.com
   */
  baseUri: string;
  /** Freshdesk api key */
  token: string;
  /** set to true to validate api response against the zod schema */
  doValidate?: boolean;
};
