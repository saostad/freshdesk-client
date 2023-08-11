import { getData } from "../helpers/getData";
import { Requester, RequesterSchema } from "../typings/requester";
import { validateOrFail } from "../helpers/util";
import { BaseGetInput } from "../typings/general";

type GetRequesterInput = BaseGetInput & {
  requesterId: number;
};

/**
 * @description View a Requester
This operation allows you to view information about a user.
 * 
GET  /api/v2/requesters/[id]
@example
curl -v -u api_key:X -X GET 'https://domain.freshservice.com/api/v2/requesters/777'

 */
export async function getRequesterById({
  baseUri,
  requesterId,
  token,
  doValidate,
}: GetRequesterInput): Promise<Requester> {
  const uri = `${baseUri}/api/v2/requesters/${requesterId}`;
  const freshdeskResponse = await getData<Requester>({ token, uri });

  const [{ requester }] = freshdeskResponse;

  if (doValidate) {
    validateOrFail({ data: requester, schema: RequesterSchema });
  }

  return requester;
}
