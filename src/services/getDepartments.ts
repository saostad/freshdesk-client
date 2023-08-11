import { writeLog } from "fast-node-logger";
import { validateOrFail } from "../helpers/util";
import { Department, DepartmentsSchema } from "../typings/departments";
import { getData } from "../helpers/getData";
import { BaseGetInput } from "../typings/general";

export async function getDepartments({
  baseUri,
  token,
  doValidate,
}: BaseGetInput) {
  writeLog(`getDepartments()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/departments`;

  const data = await getData<Department[]>({ uri, token });

  const departments: Department[] = [];
  data.forEach((el) => {
    departments.push(...el["departments"]);
  });

  if (doValidate) {
    validateOrFail({ data: departments, schema: DepartmentsSchema });
  }

  writeLog(`${departments.length} departments downloaded.`, {
    stdout: true,
    level: "info",
  });

  return departments;
}
