export type InternalBaseGetInput = {
  /** full endpoint url, including domain, api version and endpoint
   * @example https://domain.freshservice.com/api/v2/tickets
   */
  uri: string;
  /** Freshdesk api key */
  token: string;
  /** @info You can request for additional resources using the "include" keyword. For example you can embed the requester's details within the ticket view API by using the following command.
   * @ref for acceptable values refer to [freshservice api documentations](https://api.freshservice.com/#embedding). */
  include?: string;
  /** query parameters */
  params?: Record<string, string>;
  /** number of items per page
   * @ref https://api.freshservice.com/v2/#pagination
   * @default 30
   */
  perPage?: number;
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
  /** number of items per page
   * @ref https://api.freshservice.com/v2/#pagination
   * @default 30
   */
  perPage?: number;
};

export type InternalBasePostInput<InputData extends Record<string, any>> = {
  /** base freshdesk url
   * @example https://domain.freshservice.com
   */
  uri: string;
  /** Freshdesk api key */
  token: string;
  /** data to send to api */
  data: InputData;
};

export type BaseCreateInput = {
  /** base freshdesk url
   * @example https://domain.freshservice.com
   */
  baseUri: string;
  /** Freshdesk api key */
  token: string;
};

export type InternalBasePutInput<InputData = any> = {
  /** base freshdesk url
   * @example https://domain.freshservice.com
   */
  uri: string;
  /** Freshdesk api key */
  token: string;
  /** data to send to api */
  data: InputData;
};

export type BaseUpdateInput = {
  /** base freshdesk url
   * @example https://domain.freshservice.com
   */
  baseUri: string;
  /** Freshdesk api key */
  token: string;
};

export type InternalBaseDeleteInput = {
  /** base freshdesk url
   * @example https://domain.freshservice.com
   */
  uri: string;
  /** Freshdesk api key */
  token: string;
};

export type BaseDeleteInput = {
  /** base freshdesk url
   * @example https://domain.freshservice.com
   */
  baseUri: string;
  /** Freshdesk api key */
  token: string;
};
